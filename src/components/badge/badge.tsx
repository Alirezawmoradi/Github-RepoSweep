import React from "react";
import {BadgeProps} from "@/components/badge/badge.types";


export const Badge: React.FC<BadgeProps> = ({className, children}: BadgeProps) => {

    return <span className={className}>
        {children}
    </span>
}