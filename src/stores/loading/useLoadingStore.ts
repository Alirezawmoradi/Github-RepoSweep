import {create} from "zustand";
import {LoadingState} from "@/stores/loading/loading-state.types";

export const useLoadingStore = create<LoadingState>((set) => ({
    loading: false,

    actions: {
        setLoading: (isLoading) => set({loading: isLoading}),
    }
}))