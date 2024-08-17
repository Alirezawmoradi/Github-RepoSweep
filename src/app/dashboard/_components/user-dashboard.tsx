'use client';
import {signOut, useSession} from "next-auth/react";
import axios from "axios";
import {useEffect, useState} from "react";
import {Card} from "@/components/card/card";


export const UserDashboard = () => {
    const {data: session} = useSession();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());
    useEffect(() => {
        const fetchRepos = async () => {
            if (!session) {
                console.log("No session found");
                return;
            }

            console.log("Access Token:", session.accessToken);

            try {
                const result = await axios.get('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                console.log('Data:', result.data);
                setRepos(result.data);
            } catch (error) {
                console.log('Error:', error);
            }
        }
        fetchRepos()
    }, [session]);


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

        const username = session.user.name; // GitHub username
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

            // Remove the repos from the state
            setRepos(repos.filter(repo => !selectedRepos.has(repo.id)));
            setSelectedRepos(new Set()); // Clear selected repos
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className='container grid md:grid-cols-10 grid-rows-[1fr 1fr] gap-10 py-10'>
            <div
                className="bg-blue-900 pointer-events-none absolute right-0 aspect-square w-1/2   rounded-full opacity-10 blur-3xl"></div>
            <div className="col-span-1 xl:col-span-2">
                <div className='w-screen mx-auto relative z-[2] text-white'>
                    <div className='flex gap-5'>
                        <p> {session?.user?.name}</p>
                        <p>{session?.user?.email}</p>
                    </div>
                    <img src={`${session?.user?.image}`} alt='image' width={256} height={256}/>
                    <div className='flex gap-5'>
                        <button onClick={handleBulkRemove} disabled={selectedRepos.size === 0}>Remove Selected</button>
                    </div>
                    <button onClick={() => signOut()}>sign out</button>
                </div>
            </div>
                <div className='col-span-10 xl:col-span-8'>
                    <div className='flex flex-col px-10 pt-56 w-full container'>
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
                                        language={repo.language} // Pass language to Card
                                        stargazers_count={repo.stargazers_count}
                                        topics={repo.topics}
                                    />
                                ))}
                            </div>
                    </div>
                </div>
        </div>
    )
}