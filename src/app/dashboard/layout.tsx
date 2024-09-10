import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen bg-black">
            <div
                className="absolute -mt-10 bg-black inset-0 bg-star-pattern bg-cover bg-center bg-no-repeat bg-fixed z-0"
            ></div>
            <main className="relative z-10 min-h-screen  ">
                {children}
            </main>
        </div>
    );
}
