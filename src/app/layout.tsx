import "./globals.css";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";
import {Stars} from "@/components/stars/stars";
import {Poppins} from "next/font/google";

const poppins=Poppins({
    display: 'swap',
    subsets: ['latin'],
    weight: ['100','200','300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins'
})

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    return (
        <html lang="en"  className={`${poppins.variable}`}>
        <body className='min-h-screen'>
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
