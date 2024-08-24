import {create} from "zustand";

export const useRepoStore = create<RepoState>((set) => ({
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

    }
}))