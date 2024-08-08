'use client';

import {useState} from "react";

export const AuthButton = ({text, onClick}: AuthButtonProps) => {
    const [hovered, setHovered] = useState<boolean>(false)
    return (
        <div
            className='lg:ml-5 flex items-center justify-center lg:space-x-5 max-lg:space-y-3 max-lg:flex-col max-lg:w-full max-lg:mt-5'>
            <button onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
               onClick={onClick}
               className='flex items-center bg-white cursor-pointer hover:bg-gray-300 transition-colors duration-300 font-bold px-14 py-3 justify-center rounded-md text-[20px]'>
                {text}
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={` ml-2 transition ease-in duration-150 ${hovered ? "translate-x-2 " : "-translate-x-0"}`}
                     width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path fill="currentColor"
                          d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path>
                    <path
                        className={`  transition ease-in duration-150 ${hovered ? " opacity-100" : "opacity-0 "}`}
                        stroke="currentColor" d="M1.75 8H11" strokeWidth="1.5"
                        strokeLinecap="round"></path>
                </svg>
            </button>
        </div>
    )
}