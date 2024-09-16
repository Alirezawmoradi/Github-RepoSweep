import {AvatarProps} from "@/components/avatar/avatar.types";
import React from "react";


export const Avatar: React.FC<AvatarProps> = ({src, alt, className}: AvatarProps) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`rounded-full border-4 border-gray-800 shadow-md ${className}`}
        />
    )
}