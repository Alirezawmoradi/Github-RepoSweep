import {Session} from "next-auth";

export interface Follower {
    id: number;
    login: string;
    avatar_url: string;
}

export interface FollowerManagerState {
    followers: Follower[];
    following: Follower[];
    notFollowedBack: Follower[];
    selectedUsers: string[];
    loading: boolean;
    actions: {
        fetchFollowersAndFollowing: (username: string, session: Session) => Promise<void>;
        toggleSelection: (username: string) => void;
        selectAll: () => void;
        clearSelection: () => void;
        unfollowSelected: (session: Session) => Promise<void>;
    }
}