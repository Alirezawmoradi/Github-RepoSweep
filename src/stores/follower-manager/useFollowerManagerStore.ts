import {create} from "zustand";
import axios from "axios";
import {Follower, FollowerManagerState} from "@/stores/follower-manager/follower-manager.types";

export const useFollowerManagerStore = create<FollowerManagerState>((set, get) => ({
    followers: [],
    following: [],
    notFollowedBack: [],
    selectedUsers: [],
    loading: false,

    actions: {

        fetchFollowersAndFollowing: async (username, session) => {

            set({loading: true});

            try {
                const [followersRes, followingRes] = await Promise.all([
                    axios.get<Follower[]>(`https://api.github.com/users/${username}/followers`, {
                        headers: {Authorization: `Bearer ${session.accessToken}`},
                    }),
                    axios.get<Follower[]>(`https://api.github.com/users/${username}/following`, {
                        headers: {Authorization: `Bearer ${session.accessToken}`},
                    }),
                ]);

                const followers = followersRes.data;
                const following = followingRes.data;

                const notFollowedBack = following.filter((followed) => !followers.some((follower) => follower.login === followed.login))

                set({followers, following, notFollowedBack, loading: false});

            } catch (error) {
                console.error('Error fetching followers and following:', error);
                set({loading: false});
            }
        },

        toggleSelection: (username: string) => {
            const {selectedUsers} = get();
            if (selectedUsers.includes(username)) {
                set({selectedUsers: selectedUsers.filter((user) => user !== username)});
            } else {
                set({selectedUsers: [...selectedUsers, username]});
            }
        },

        selectAll: () => {
            const {notFollowedBack} = get();
            set({selectedUsers: notFollowedBack.map(user => user.login)});
        },

        clearSelection: () => {
            set({selectedUsers: []});
        },

        unfollowSelected: async (session) => {
            const {selectedUsers} = get();

            try {
                await Promise.all(
                    selectedUsers.map((username) => {
                        axios.delete(`https://api.github.com/user/following/${username}`, {
                            headers: {Authorization: `Bearer ${session?.accessToken}`},
                        })
                    })
                );
                set({selectedUsers: []})
            } catch (error) {
                console.error('Error unfollowing users:', error);
            }
        }

    }
}))