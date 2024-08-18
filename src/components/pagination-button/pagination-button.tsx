import React from "react";
import {PaginationButtonProps} from "@/components/pagination-button/pagination-button.types";

export const PaginationButton: React.FC<PaginationButtonProps> = ({text, onClick,disabled}: PaginationButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 border border-transparent mx-1 rounded-md transition-colors duration-300 ${disabled?'text-gray-400 opacity-50':'text-blue-500 cursor-pointer hover:border hover:border-gray-700'}`}>
            {text}
        </button>
    )
}