'use client';

import {signIn, signOut, useSession} from "next-auth/react";

export const AuthButton = () => {
    const {data: session} = useSession();
    return (
        <>
            <div className='flex items-center justify-center gap-5'>
                {
                    session?.user?.email ?
                        (<button onClick={() => signOut()}>SignOut</button>)
                        :
                        (<button onClick={() => signIn('github', {
                            callbackUrl: '/dashboard'
                        })}>SignIn</button>)
                }
            </div>
        </>
    )
}