'use client';

import {SessionProvider, SessionProviderProps} from "next-auth/react";

export const Provider = ({session, children}: SessionProviderProps) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}