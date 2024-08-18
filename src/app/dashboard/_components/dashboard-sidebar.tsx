import React from "react";
import {useUserProfile} from "@/utils/user-profile-hook/useUserProfile";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";

export const DashboardSidebar: React.FC = () => {
    const {data: session} = useSession();
    const userData = useUserProfile(session);

    return <aside className="col-span-1 xl:col-span-3 pl-10 sticky top-20 h-screen">
        <div className="flex flex-col items-center text-white">
            <img
                src={userData?.avatar_url}
                alt="Profile Image"
                className="w-64 h-64 rounded-full border-4 border-gray-800 shadow-md"
            />
            <div className="mt-4 text-center">
                <p className="text-2xl font-bold">{userData?.login}</p>
                <p className="text-gray-400">@{userData?.login}</p>
            </div>
            <div className="mt-4 text-center text-gray-300">
                <p>{userData?.bio}</p>
            </div>
            <div className="mt-6 text-center text-sm">
                <p className="flex items-center justify-center">
                    <span className="ml-2">{userData?.location}</span>
                </p>
                <p className="mt-2 flex items-center justify-center">
                    <span className="ml-2">{userData?.email}</span>
                </p>
                <p className="mt-2 text-gray-400">
                    {userData?.followers || 0} followers · {userData?.following || 0} following
                </p>
            </div>
        </div>
    </aside>

}