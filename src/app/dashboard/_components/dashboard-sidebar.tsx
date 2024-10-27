import React from "react";
import {useModalStore} from "@/stores/modal/useModalStore";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {Avatar} from "@/components/avatar/avatar";
import {useLoadingStore} from "@/stores/loading/useLoadingStore";
import Lottie from "lottie-react";
import animatedLogo from "../../../../public/Animated-Github.json";
import {Button} from "@/components/button/button";

interface DashboardSidebarProps {
    userData: UserProfileProps | null;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({userData}) => {
    const {openModal} = useModalStore((state) => state.actions);
    const selectedRepoCount = useRepoStore((state) => state.selectedRepos.size);
    const { initialLoad} = useLoadingStore();


    return (
        <>
            <aside className="hidden xl:block col-span-1 xl:col-span-3 pl-10 sticky top-20 h-screen">
                <div className="flex flex-col items-center text-white">
                    { initialLoad ?
                        <Lottie animationData={animatedLogo} className='w-64 h-64 animate-pulse'/>
                        :
                        <Avatar className={`w-64 h-64`}
                                src={userData?.avatar_url} alt='Profile Image'/>
                    }
                    <div className="mt-4 text-center">
                        {initialLoad ? (
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
                        { initialLoad ? (
                            <div className="w-44 h-2.5 bg-gray-600 rounded animate-pulse"/>
                        ) : (
                            <p>{userData?.bio}</p>
                        )}
                    </div>
                    <div className="mt-6 text-center text-sm">
                        { initialLoad ? (
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
                        { initialLoad ? (
                            <div className='flex justify-center mt-2 gap-2'>
                                <div className="w-10 h-1.5 bg-gray-600 rounded animate-pulse "/>
                                <div className="w-10 h-1.5 bg-gray-600 rounded animate-pulse "/>
                            </div>
                        ) : (
                            <p className="mt-2 text-gray-400">
                                {userData?.followers || 0} followers · {userData?.following || 0} following
                            </p>
                        )}
                        <div
                            className={`flex justify-between mt-10 relative ${ initialLoad ? 'hidden' : 'block'}`}>
                            <Button
                                onClick={openModal}
                                type='default'
                                selectedRepoCount={selectedRepoCount}
                                className='disabled:bg-red-900/50 disabled:text-gray-500'
                            >
                                Remove Selected Repos
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="flex flex-col items-center w-full justify-center mr-auto xl:hidden mt-6">
                <div className="flex items-center justify-center px-5">
                    { initialLoad ? (
                        <Lottie animationData={animatedLogo} className="w-16 h-16 animate-pulse"/>
                    ) : (
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" src={userData?.avatar_url}
                                alt="Profile Image"/>
                    )}
                    <div className="ml-4">
                        { initialLoad ? (
                            <div className="space-y-2">
                                <div className="w-24 h-3.5 bg-gray-700 rounded animate-pulse"/>
                                <div className="w-16 h-2 bg-gray-600 rounded animate-pulse"/>
                            </div>
                        ) : (
                            <>
                                <p className="font-medium text-gray-200">{userData?.login}</p>
                                <p className="text-gray-400 text-xs mt-1">@{userData?.login}</p>
                                <p className="text-gray-300 text-xs mt-1">{userData?.bio}</p>
                            </>
                        )}
                    </div>
                </div>
                <div
                    className={`flex justify-center mt-4 ${
                         initialLoad ? "hidden" : "block"
                    }`}
                >
                    <Button
                        onClick={openModal}
                        type="default"
                        selectedRepoCount={selectedRepoCount}
                        className="disabled:bg-red-900/50 disabled:text-gray-500 text-xs"
                    >
                        Remove Selected Repos
                    </Button>
                </div>
            </div>
        </>
    )

}