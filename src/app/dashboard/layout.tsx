import {ReactNode} from "react";

export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <main className='relative  min-h-screen bg-star-pattern bg-cover bg-center bg-no-repeat grid grid-rows-[80px_1fr] overflow-x-hidden bg-black'>
            <div className="relative z-10 mt-20">
                {children}
            </div>
        </main>
    )
}
