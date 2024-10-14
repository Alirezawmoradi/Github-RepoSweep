'use client';
import {useSession} from "next-auth/react";
import React from "react";
import {Card} from "@/components/card/card";
import {PaginationButton} from "@/components/pagination-button/pagination-button";
import {DashboardSidebar} from "@/app/dashboard/_components/dashboard-sidebar";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {Modal} from "@/components/modal/modal";
import {Background} from "@/components/background/background";
import {Header} from "@/components/header/header";
import {useLoadingStore} from "@/stores/loading/useLoadingStore";
import SkeletonCard from "@/components/loading/skeleton-card/skeleton-card";
import {useUserData} from "@/utils/user-profile-hook/useUserData";


export const UserDashboard = () => {
    const {data: session} = useSession();

    const {currentPage, selectedRepos, totalPages} = useRepoStore();
    const {handleSelectRepo, setCurrentPage} = useRepoStore((state) => state.actions);

    const {loading, initialLoad} = useLoadingStore();

    const {repos} = useUserData(session, currentPage);

    const paginate = async (pageNumber: number) => {
        setCurrentPage(pageNumber);
        await new Promise((resolve) => setTimeout(resolve, 100));
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div className='relative'>
            <Background/>
            <Header/>
            <div className='container grid md:grid-cols-11 grid-rows-[1fr 1fr] pt-20 gap-10 py-10'>
                <DashboardSidebar/>
                <div className='col-span-10 xl:col-span-8'>
                    <div className='flex flex-col px-10  w-full container'>
                        <div className='relative flex flex-col gap-6'>
                            {loading && initialLoad ?
                                Array.from({length: 10}, (_, index) => (
                                    <SkeletonCard key={index}/>
                                ))
                                :
                                repos.map((repo) => (
                                    <Card
                                        key={repo.id}
                                        {...repo}
                                        onSelect={() => handleSelectRepo(repo.id)}
                                        isSelected={selectedRepos.has(repo.id)}
                                    />
                                ))}
                            {repos.length > 0 && (
                                <div
                                    className={`flex justify-center mt-10 ${loading && initialLoad ? 'hidden' : 'block'}`}>
                                    <PaginationButton
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        text='< Previous'
                                    />
                                    <PaginationButton
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage >= totalPages}
                                        text='Next >'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Modal/>
            </div>
        </div>
    )
}