import {ReactNode} from "react";

export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <main className='bg-gray-600 min-h-screen grid grid-rows-[80px_1fr_auto] overflow-x-hidden'>
            <img src='/images/hero-bg.webp' alt='galaxy' width={1300} height={807}
                   className="fixed bottom-0 left-0 w-screen min-h-screen object-cover d-block pointer-events-none"/>
            {children}
        </main>

    )
}