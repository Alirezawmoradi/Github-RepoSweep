import {Session} from "next-auth";

interface Repository {
    name: string;
    id: number;
    private: boolean;
    description: string | null;
    html_url: string;
    language: string;
    stargazers_count: number;
    topics: number[];
}

export interface RepoState {
    repos: Repository[];
    selectedRepos: Set<number>;
    currentPage: number;
    totalPages: number;
    actions: {
        setRepos: (repos: Repository[]) => void;
        handleSelectRepo: (repoId: number) => void;
        removeSelectedRepos: () => void;
        setCurrentPage: (page: number) => void;
        setTotalPages: (totalPages: number) => void;
        handleBulkRemove: (session: Session | null, repos: Repository[],userData:UserProfileProps) => Promise<void>;
    }
}