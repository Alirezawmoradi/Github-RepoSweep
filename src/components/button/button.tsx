import React from 'react';
import {ButtonProps} from "@/components/button/button.types";

export const Button: React.FC<ButtonProps> = ({
                                                  onClick,
                                                  children,
                                                  type,
                                                  selectedRepoCount = 0,
                                                  className
                                              }) => {
    const baseStyles = "font-bold py-2 px-4 rounded transition-colors duration-300 relative cursor-pointer";

    const styles = {
        default: "bg-red-500 hover:bg-red-600 text-white",
        cancel: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    };

    const getButtonStyles = () => {
        switch (type) {
            case 'cancel':
                return styles.cancel;
            default:
                return styles.default;
        }
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${getButtonStyles()} ${className}`}
            disabled={type === 'default' && selectedRepoCount === 0}
        >
            {children}
            {type === 'default' && selectedRepoCount > 0 && (
                <span
                    className="absolute top-0 right-0 bg-white text-red-500 rounded-full px-2 text-xs font-bold translate-x-1/2 -translate-y-1/2">
                    {selectedRepoCount}
                </span>
            )}
        </button>
    );
};