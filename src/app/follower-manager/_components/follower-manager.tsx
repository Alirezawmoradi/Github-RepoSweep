'use client';
import React, {useEffect} from "react";
import {useFollowerManagerStore} from "@/stores/follower-manager/useFollowerManagerStore";
import {useSession} from "next-auth/react";
import {useSearchParams} from "next/navigation";

export const UserFollowerManager: React.FC= () => {
    const {data: session} = useSession();
    const searchParams = useSearchParams();
    const username = searchParams.get("username");

    const {
        followers,
        following,
        selectedUsers,
        loading,
        notFollowedBack
    } = useFollowerManagerStore();

    const {
        fetchFollowersAndFollowing,
        toggleSelection,
        selectAll,
        clearSelection,
        unfollowSelected,
    } = useFollowerManagerStore((state) => state.actions);

    useEffect(() => {
        if (username && session) fetchFollowersAndFollowing(username, session);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center text-white">
            <h2 className="text-xl font-bold">GitHub Follower Manager</h2>
            {/*{loading ? (*/}
            {/*    <p>Loading...</p>*/}
            {/*) : (*/}
                <>
                    {/* Not Following Back Section */}
                    <div className="mt-8">
                        <h3 className="font-bold">Not Following Back</h3>
                        <div className="flex items-center gap-4">
                            <button onClick={selectAll} className="btn-primary">
                                Select All
                            </button>
                            <button onClick={clearSelection} className="btn-secondary">
                                Clear Selection
                            </button>
                            <button onClick={() => unfollowSelected(session)} className="btn-danger">
                                Unfollow Selected
                            </button>
                        </div>
                        <ul>
                            {notFollowedBack.map((user) => (
                                <li key={user.id} className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.login)}
                                        onChange={() => toggleSelection(user.login)}
                                    />
                                    <img src={user.avatar_url} alt={user.login} className="w-8 h-8 rounded-full"/>
                                    <p>{user.login}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            {/*)}*/}
        </div>
    )


}