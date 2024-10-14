import React from "react";
import {useUserData} from "@/hooks/user-profile-hook/useUserData";
import {useSession} from "next-auth/react";
import {useModalStore} from "@/stores/modal/useModalStore";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {Avatar} from "@/components/avatar/avatar";
import {useLoadingStore} from "@/stores/loading/useLoadingStore";
import Lottie from "lottie-react";
import animatedLogo from "../../../../public/Animated-Github.json";


export const DashboardSidebar: React.FC = () => {
    const {data: session} = useSession();
    const {userData} = useUserData(session);
    const {openModal} = useModalStore((state) => state.actions);
    const selectedRepoCount = useRepoStore((state) => state.selectedRepos.size);
    const {loading, initialLoad} = useLoadingStore();


    return <aside className="col-span-1 xl:col-span-3 pl-10 sticky top-20 h-screen">
        <div className="flex flex-col items-center text-white">
            {loading && initialLoad ?
                <Lottie animationData={animatedLogo} className='w-64 h-64 animate-pulse'/>
                :
                <Avatar className={`w-64 h-64`}
                        src={userData?.avatar_url} alt='Profile Image'/>
            }
            <div className="mt-4 text-center">
                {loading && initialLoad ? (
                    <div className="space-y-2 justify-center items-center flex flex-col">
                        <div className="w-32 h-3.5 bg-gray-700 rounded animate-pulse"/>
                        <div className="w-20 h-2 bg-gray-600 rounded animate-pulse"/>
                    </div>
                ) : (
                    <>
                        <p className="text-2xl font-bold">{userData?.login}</p>
                        <p className="text-gray-400">@{userData?.login}</p>
                    </>
                )}
            </div>
            <div className="mt-4 text-center text-gray-300">
                {loading && initialLoad ? (
                    <div className="w-44 h-2.5 bg-gray-600 rounded animate-pulse"/>
                ) : (
                    <p>{userData?.bio}</p>
                )}
            </div>
            <div className="mt-6 text-center text-sm">
                {loading && initialLoad ? (
                    <>
                        <div className="w-20 h-2 bg-gray-600 rounded animate-pulse mx-auto"/>
                        <div className="w-36 h-2 bg-gray-600 rounded animate-pulse mt-2 mx-auto"/>
                    </>
                ) : (
                    <>
                        <p className="flex items-center justify-center">
                            <span className="ml-2">{userData?.location}</span>
                        </p>
                        <p className="mt-2 flex items-center justify-center">
                            <span className="ml-2">{userData?.email}</span>
                        </p>
                    </>
                )}
                {loading && initialLoad ? (
                    <div className='flex justify-center mt-2 gap-2'>
                        <div className="w-10 h-1.5 bg-gray-600 rounded animate-pulse "/>
                        <div className="w-10 h-1.5 bg-gray-600 rounded animate-pulse "/>
                    </div>
                ) : (
                    <p className="mt-2 text-gray-400">
                        {userData?.followers || 0} followers · {userData?.following || 0} following
                    </p>
                )}
                <div className="flex justify-between mt-10 relative">
                    <button
                        onClick={openModal}
                        className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${loading && initialLoad ? 'hidden' : 'block'}`}
                    >
                        Bulk Remove Selected
                        {
                            selectedRepoCount > 0 && (
                                <span
                                    className="absolute top-0 right-0 bg-white text-red-500 rounded-full px-2 text-xs font-bold translate-x-1/2 -translate-y-1/2">
                                    {selectedRepoCount}
                                </span>
                            )}
                    </button>
                </div>
            </div>
        </div>
    </aside>

}