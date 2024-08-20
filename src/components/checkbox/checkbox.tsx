import React from 'react';
import { CheckboxProps } from "@/components/checkbox/checkbox.types";
import { BsTrash } from "react-icons/bs";

export const Checkbox: React.FC<CheckboxProps> = ({ isSelected, onSelect }: CheckboxProps) => {
    return (
        <div className="flex items-center transition-colors duration-300">
            <input
                type="checkbox"
                id="delete-checkbox"
                checked={isSelected}
                onChange={onSelect}
                className="hidden"
            />
            <div
                className={`h-5 w-5 rounded-full transition-all duration-300 ${
                    isSelected
                        ? 'bg-red-500/40 shadow-glow'
                        : ''
                }`}
                onClick={onSelect}
            />
            <BsTrash
                className={`h-5 w-5 text-2xl absolute transition  ${
                    isSelected ? 'text-red-500' : 'text-gray-400'
                }`}
            />
        </div>
    );
};
