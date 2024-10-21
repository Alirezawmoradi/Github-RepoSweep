export type ButtonProps = {
    onClick: () => void;
    children?: React.ReactNode;
    type?: 'default' | 'cancel' | 'confirm';
    selectedRepoCount?: number;
    className?: string;
};
