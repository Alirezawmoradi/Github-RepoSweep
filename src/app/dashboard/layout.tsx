import {ReactNode} from "react";

export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <main className='relative bg-gray-600 min-h-screen grid grid-rows-[80px_1fr] overflow-x-hidden'>
            <img
                src='/images/hero-bg.webp'
                alt='galaxy'
                width={1300}
                height={807}
                className="fixed bottom-0 left-0 w-screen min-h-screen object-cover pointer-events-none"
            />
            <div className="relative z-10">
                {children}
            </div>
        </main>
    )
}
