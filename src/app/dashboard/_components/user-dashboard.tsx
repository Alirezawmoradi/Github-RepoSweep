'use client';
import {useSession} from "next-auth/react";
import axios from "axios";
import React, {useEffect} from "react";
import {Card} from "@/components/card/card";
import {PaginationButton} from "@/components/pagination-button/pagination-button";
import {DashboardSidebar} from "@/app/dashboard/_components/dashboard-sidebar";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {Modal} from "@/components/modal/modal";
import {Background} from "@/components/background/background";
import {Header} from "@/components/header/header";
import {useLoadingStore} from "@/stores/loading/useLoadingStore";
import SkeletonCard from "@/components/loading/skeleton-card/skeleton-card";


export const UserDashboard = () => {
    const {data: session} = useSession();

    const {
        repos,
        selectedRepos,
        currentPage,
        totalPages,
    } = useRepoStore();

    const {
        setRepos,
        handleSelectRepo,
        setCurrentPage,
        setTotalPages,
    } = useRepoStore((state) => state.actions);

    const {loading} = useLoadingStore();

    const {setLoading} = useLoadingStore((state) => state.actions);

    const reposPerPage = 10;

    useEffect(() => {
        const fetchRepos = async (page: number) => {
            if (!session) {
                console.log("No session found");
                return;
            }
            try {
                setLoading(true)
                const result = await axios.get('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    },
                    params: {
                        page: page,
                        per_page: reposPerPage,
                        sort: 'updated',
                        direction: 'desc',
                    }
                });
                console.log('Data:', result.data);
                setRepos(result.data);
                const linkHeader = result.headers.link;
                if (linkHeader) {
                    const totalPages = extractTotalPages(linkHeader);
                    setTotalPages(totalPages);
                }
            } catch (error) {
                console.log('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchRepos(currentPage)
    }, [session, currentPage]);

    const extractTotalPages = (linkHeader: string) => {
        const links = linkHeader.split(',').map(link => link.trim());
        const lastLink = links.find(link => link.includes('rel="last"'));
        if (lastLink) {
            const match = lastLink.match(/page=(\d+)/);
            if (match && match[1]) {
                return parseInt(match[1], 10);
            }
        }
        return 1;
    };


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
                            {loading ?
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
                            {!loading && repos.length > 0 && (
                                <div className='flex justify-center mt-10'>
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