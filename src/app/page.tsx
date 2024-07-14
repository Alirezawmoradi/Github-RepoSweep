'use client';
import {AuthButton} from "@/components/auth-botton";
import {useSession} from "next-auth/react";
export default function Home() {
    const {data: session} = useSession();
    return (
        <>
            <div className='flex w-full justify-center items-center'>This is Main Page</div>
            <AuthButton/>
            {session?.user?.name}
            {session?.user?.email}
            <img src={`${session?.user?.image}`} alt='image' width={256} height={256} />
        </>
    );
}
