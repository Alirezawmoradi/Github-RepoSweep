export type LoadingState = {
    loading: boolean,

    actions: {
        setLoading: (isLoading: boolean) => void,
    }
}