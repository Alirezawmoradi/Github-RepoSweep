import {useEffect, useState} from "react";
import {Session} from "next-auth";
import axios from "axios";
import {useLoadingStore} from "@/stores/loading/useLoadingStore";
import {useRepoStore} from "@/stores/repository/useRepoStore";

export const useUserData = (session: Session | null, currentPage?: number) => {
    const [userData, setUserData] = useState<UserProfileProps | null>(null);

    const {initialLoad} = useLoadingStore();
    const {setLoading, setInitialLoad} = useLoadingStore((state) => state.actions);

    const {repos} = useRepoStore();
    const {setRepos, setTotalPages} = useRepoStore((state) => state.actions);

    const reposPerPage = 10;

    useEffect(() => {
        const fetchUserDataAndRepos = async () => {
            if (!session) {
                console.log("No session found");
                return;
            }
            setLoading(true);
            try {
                const [userDataResult, repoDataResult] = await Promise.all([
                    axios.get<UserProfileProps>('https://api.github.com/user', {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }),
                    axios.get('https://api.github.com/user/repos', {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                        params: {
                            page: currentPage,
                            per_page: reposPerPage,
                            sort: 'updated',
                            direction: 'desc',
                        },
                    }),
                ]);

                setUserData(userDataResult.data);
                setRepos(repoDataResult.data);

                const linkHeader = repoDataResult.headers.link;
                if (linkHeader) {
                    const totalPages = extractTotalPages(linkHeader);
                    setTotalPages(totalPages);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                if (initialLoad) {
                    setInitialLoad(false);
                } else {
                    setLoading(false);
                }
            }
        };
        fetchUserDataAndRepos();
    }, [session, currentPage]);
    const extractTotalPages = (linkHeader: string): number => {
        const links = linkHeader.split(',').map((link) => link.trim());
        const lastLink = links.find((link) => link.includes('rel="last"'));
        if (lastLink) {
            const match = lastLink.match(/page=(\d+)/);
            if (match && match[1]) {
                return parseInt(match[1], 10);
            }
        }
        return 1;
    };

    return {userData, repos};
};