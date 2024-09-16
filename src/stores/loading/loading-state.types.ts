export type LoadingState = {
    loading: boolean,
    initialLoad:boolean,

    actions: {
        setLoading: (isLoading: boolean) => void,
        setInitialLoad: (isLoading: boolean) => void,
    }
}