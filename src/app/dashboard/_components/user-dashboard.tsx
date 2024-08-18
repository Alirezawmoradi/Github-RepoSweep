'use client';
import {signOut, useSession} from "next-auth/react";
import axios from "axios";
import {useEffect, useState} from "react";
import {Card} from "@/components/card/card";
import {PaginationButton} from "@/components/pagination-button/pagination-button";
import {useUserProfile} from "@/utils/user-profile-hook/useUserProfile";


export const UserDashboard = () => {
    const {data: session} = useSession();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const userData = useUserProfile(session);
    const reposPerPage = 10;
    useEffect(() => {
        const fetchRepos = async (page: number) => {
            if (!session) {
                console.log("No session found");
                return;
            }

            console.log("Access Token:", session.accessToken);

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


    const handleSelectRepo = (repoId: number) => {
        setSelectedRepos(prev => {
            const updated = new Set(prev);
            if (updated.has(repoId)) {
                updated.delete(repoId);
            } else {
                updated.add(repoId);
            }
            return updated;
        });
    };

    const handleBulkRemove = async () => {
        if (!session || !session.accessToken || !session.user?.name) {
            console.log("No session, access token, or user name found");
            return;
        }

        const username = session.user.name;
        const selectedRepoNames = repos.filter(repo => selectedRepos.has(repo.id)).map(repo => repo.name);

        try {
            const deletePromises = selectedRepoNames.map(repoName =>
                axios.delete(`https://api.github.com/repos/${username}/${repoName}`, {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
            );
            await Promise.all(deletePromises);

            setRepos(repos.filter(repo => !selectedRepos.has(repo.id)));
            setSelectedRepos(new Set());
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='container grid md:grid-cols-11 grid-rows-[1fr 1fr] pt-56 gap-10 py-10'>
            <div className="col-span-1 xl:col-span-3 pl-10">
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
            </div>

            <div className='col-span-10 xl:col-span-8'>
                <div className='flex flex-col px-10  w-full container'>
                    <div className='relative z-[1] flex flex-col gap-6'>
                        {repos.map((repo) => (
                            <Card
                                key={repo.id}
                                name={repo.name}
                                description={repo.description}
                                isPrivate={repo.private}
                                url={repo.html_url}
                                onSelect={() => handleSelectRepo(repo.id)}
                                isSelected={selectedRepos.has(repo.id)}
                                language={repo.language}
                                stargazers_count={repo.stargazers_count}
                                topics={repo.topics}
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
        </div>
    )
}