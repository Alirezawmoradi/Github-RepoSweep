import {create} from "zustand";
import axios from "axios";
import {RepoState} from "@/stores/repository/repository.types";

export const useRepoStore = create<RepoState>((set,get) => ({
    repos: [],
    selectedRepos: new Set(),
    currentPage: 1,
    totalPages: 1,

    actions: {

        setRepos: (repos) => set(() => ({repos})),

        handleSelectRepo: (repoId: number) => set((state) => {
            const updatedSelectedRepos = new Set(state.selectedRepos);
            if (updatedSelectedRepos.has(repoId)) {
                updatedSelectedRepos.delete(repoId);
            } else {
                updatedSelectedRepos.add(repoId);
            }
            return {selectedRepos: updatedSelectedRepos};
        }),

        removeSelectedRepos: () => set((state) => ({
            repos: state.repos.filter(repo => !state.selectedRepos.has(repo.id)),
            selectedRepos: new Set(),
        })),

        setCurrentPage: (page) => set(() => ({currentPage: page})),

        setTotalPages: (totalPages) => set(() => ({totalPages})),

        handleBulkRemove: async (session, repos,userData) => {
            if (!session || !session.accessToken || !session.user?.name) {
                console.log("No session, access token, or user name found");
                return;
            }

            const username = userData?.login;

            const selectedRepoNames = repos
                .filter(repo => get().selectedRepos.has(repo.id))
                .map(repo => repo.name);

            try {
                await Promise.all(selectedRepoNames.map(repoName =>
                    axios.delete(`https://api.github.com/repos/${username}/${repoName}`, {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`
                        }
                    })
                ));
                set((state) => ({
                    repos: state.repos.filter(repo => !state.selectedRepos.has(repo.id)),
                    selectedRepos: new Set(),
                }));
            } catch (error) {
                console.log('Error:', error);
            }
        }
    }
}))