export type ButtonProps = {
    onClick: () => void;
    children?: React.ReactNode;
    type?: 'default' | 'cancel';
    selectedRepoCount?: number;
    className?: string;
};
