interface Repository {
    name: string;
    id: number;
    private: boolean;
    description: string | null;
    html_url: string;
    language: string;
    stargazers_count:number;
    topics: number[];
}