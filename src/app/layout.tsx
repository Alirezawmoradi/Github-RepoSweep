import "./globals.css";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";
import {Stars} from "@/components/stars";
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
        <body className='min-h-screen flex flex-row'>
        <img className="fixed bottom-0 left-0 w-full h-full object-cover d-block pointer-events-none" width="801"
             height="807" loading="lazy" decoding="async" alt="" aria-hidden="true"
             src="https://github.githubassets.com/images/modules/site/home-campaign/footer-galaxy.jpg"/>
        <Stars/>
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
