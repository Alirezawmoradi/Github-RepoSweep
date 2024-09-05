'use client';
import {useSession} from "next-auth/react";
import axios from "axios";
import React, {useEffect} from "react";
import {Card} from "@/components/card/card";
import {PaginationButton} from "@/components/pagination-button/pagination-button";
import {DashboardSidebar} from "@/app/dashboard/_components/dashboard-sidebar";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {Modal} from "@/components/modal/modal";
import {TextAnimation} from "@/components/text-animation/text-animation";
import {AnimatedPlanet} from "@/components/animated-planet/animated-planet";


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

    const reposPerPage = 10;

    useEffect(() => {
        const fetchRepos = async (page: number) => {
            if (!session) {
                console.log("No session found");
                return;
            }
            try {
                const result = await axios.get('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    },
                    params: {
                        page: page,
                        per_page: reposPerPage,
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


    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <section className='flex container flex-col mx-auto mt-10'>
                <div className='flex justify-center items-center'>
                    <h1 className="text-white font-bold mb-6">
                        <TextAnimation text={`  Welcome to Your Dashboard, ${session?.user?.name}!`}/>
                    </h1>
                </div>
                <div className='ml-10'>
                    <AnimatedPlanet/>
                </div>
            </section>
            <div className='container grid md:grid-cols-11 grid-rows-[1fr 1fr] pt-20 gap-10 py-10'>
                <DashboardSidebar/>
                <div className='col-span-10 xl:col-span-8'>
                    <div className='flex flex-col px-10  w-full container'>
                        <div className='relative  flex flex-col gap-6'>
                            {repos.map((repo) => (
                                <Card
                                    key={repo.id}
                                    {...repo}
                                    onSelect={() => handleSelectRepo(repo.id)}
                                    isSelected={selectedRepos.has(repo.id)}
                                />
                            ))}
                            {repos.length > 0 && (
                                <div className='flex justify-center mt-10'>
                                    <PaginationButton
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        text='< Previous'
                                    />
                                    <PaginationButton
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        text='Next >'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Modal/>
            </div>
        </>
    )
}