import React from "react";
import {ReposStarsProps} from "@/components/repo-stars/repos-stars.types";

export const RepoStars: React.FC<ReposStarsProps> = ({children}: ReposStarsProps) => {
    return (
        <div className='flex gap-2 items-center text-white text-sm'>
            <p className={`${children === 0 ? 'hidden' : 'inline-block'}`}>⭐</p>
            <p className={`text-xs ${children === 0 ? 'hidden' : 'block'}`}>{children}</p>
        </div>
    )
}