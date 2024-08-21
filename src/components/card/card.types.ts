interface CardProps extends Repository{
    isPrivate: boolean;
    url: string;
    onSelect: () => void;
    isSelected: boolean;
}