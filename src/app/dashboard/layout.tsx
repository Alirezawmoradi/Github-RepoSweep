import { ReactNode } from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen bg-black">
            <div
                className="fixed inset-0 bg-black bg-star-pattern bg-cover bg-center bg-no-repeat z-0"
                style={{minHeight: '100vh'}}
            ></div>
            <main className="relative z-10 min-h-screen">
                {children}
            </main>
        </div>
    );
}
