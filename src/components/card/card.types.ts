interface CardProps {
    name: string;
    description: string | null;
    isPrivate: boolean;
    url: string;
    onSelect: () => void;
    isSelected: boolean;
    language: string;
    stargazers_count: number;
    topics: number[];
}