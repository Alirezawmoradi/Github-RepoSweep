import {Inter} from "next/font/google";
import "./globals.css";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    return (
        <html lang="en">
        <body className='min-h-screen flex flex-row'>
        <img className="fixed bottom-0 left-0 w-full h-full object-cover d-block pointer-events-none" width="801"
             height="807" loading="lazy" decoding="async" alt="" aria-hidden="true"
             src="https://github.githubassets.com/images/modules/site/home-campaign/footer-galaxy.jpg"></img>
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
