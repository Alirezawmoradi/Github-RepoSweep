import {Inter} from "next/font/google";
import "./globals.css";
import {Provider} from "@/components/provider/Provider";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider>
            <html lang="en">
            <body className={inter.className}>{children}</body>
            </html>
        </Provider>
    );
}
