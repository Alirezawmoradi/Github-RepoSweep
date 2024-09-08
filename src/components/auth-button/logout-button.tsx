import {AiOutlineLogout} from "react-icons/ai";
import React from "react";

export const LogoutButton = ({text, onClick}: AuthButtonProps) => {
    return (
        <button
            className="flex gap-2 px-2 py-1 rounded-xl justify-center items-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className='flex items-center transition-colors duration-300'>
                <div
                    className='h-5 w-5 absolute rounded-full transition-all duration-300
                                         bg-red-500/40 shadow-glow'/>
                <AiOutlineLogout className='h-5 w-5'/>
            </div>
            {text}
        </button>
    )
}