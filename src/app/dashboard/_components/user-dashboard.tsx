'use client';
import {useSession} from "next-auth/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Card} from "@/components/card/card";
import {PaginationButton} from "@/components/pagination-button/pagination-button";
import {DashboardSidebar} from "@/app/dashboard/_components/dashboard-sidebar";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {Modal} from "@/components/modal/modal";
import {Background} from "@/components/background/background";
import {Header} from "@/components/header/header";
import {useLoadingStore} from "@/stores/loading/useLoadingStore";
import SkeletonCard from "@/components/loading/skeleton-card/skeleton-card";
import {ToastContainer} from "react-toastify";
import axios from "axios";


export const UserDashboard = () => {
    const {data: session} = useSession();

    const {currentPage, selectedRepos, totalPages} = useRepoStore();
    const {handleSelectRepo, setCurrentPage} = useRepoStore((state) => state.actions);

    const [userData, setUserData] = useState<UserProfileProps | null>(null);

    const {loading, initialLoad} = useLoadingStore();
    const {setInitialLoad} = useLoadingStore((state) => state.actions);

    const fetchingRef = useRef(false);
    const reposPerPage = 10;

    const {setRepos, setTotalPages} = useRepoStore((state) => state.actions);
    const {repos} = useRepoStore();

    const extractTotalPages = useCallback((linkHeader: string): number => {
        const links = linkHeader.split(',').map((link) => link.trim());
        const lastLink = links.find((link) => link.includes('rel="last"'));
        if (lastLink) {
            const match = lastLink.match(/page=(\d+)/);
            if (match && match[1]) {
                return parseInt(match[1], 10);
            }
        }
        return 1;
    }, []);

    const paginate = async (pageNumber: number) => {
        setCurrentPage(pageNumber);
        setTimeout(() => {
            fetchRepos(pageNumber)
        }, 100)
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const fetchRepos = async (page: number) => {
        const repoDataResult = await axios.get("https://api.github.com/user/repos", {
            headers: {Authorization: `Bearer ${session?.accessToken}`},
            params: {page, per_page: reposPerPage, sort: "updated", direction: "desc"},
        });
        setRepos(repoDataResult.data);
        if (page === 1) {
            const linkHeader = repoDataResult.headers.link;
            if (linkHeader) {
                const totalPages = extractTotalPages(linkHeader);
                setTotalPages(totalPages);
            }
        }
    };

    const fetchUserData = async () => {
        const userDataResult = await axios.get<UserProfileProps>("https://api.github.com/user", {
            headers: {Authorization: `Bearer ${session?.accessToken}`},
        });
        setUserData(userDataResult.data);
    };

    const fetchInitialData = async () => {
        if (!session?.accessToken || fetchingRef.current) return;

        fetchingRef.current = true;
        setInitialLoad(true);

        try {
            await Promise.all([fetchUserData(), fetchRepos(currentPage)]);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        } finally {
            setInitialLoad(false);
            fetchingRef.current = false;
        }
    };


    useEffect(() => {
        if (session?.accessToken) {
            fetchInitialData();
        }
    }, [session?.accessToken]);

    return (
        <>
            <div className='relative'>
                <Background/>
                <Header userData={userData}/>
                <div
                    className='container flex flex-col justify-center max-sm:items-center xl:grid xl:grid-cols-11 pt-20 gap-10 py-10'>
                    <DashboardSidebar userData={userData}/>
                    <div className='col-span-10 xl:col-span-8'>
                        <div className='flex flex-col px-10  w-full container'>
                            <div className='relative flex flex-col gap-6'>
                                {initialLoad ?
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
                                        className={`flex justify-center mt-10 max-sm:text-sm ${loading && initialLoad ? 'hidden' : 'block'}`}>
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
                    <Modal userData={userData}/>
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{zIndex: 10000, fontSize: '14px'}}
            />
        </>
    )
}