import {Inter} from "next/font/google";
import "./globals.css";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";
import {AuthButton} from "@/components/auth-button/auth-button";

const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    return (
        <html lang="en">
        <body className={inter.className}>
        <SessionProvider session={session}>
            <AuthButton/>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
