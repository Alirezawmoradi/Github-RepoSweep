import "./globals.css";
import {auth} from "@/auth";
import {Poppins} from "next/font/google";
import {AuthProvider} from "@/providers/auth-provider";

const poppins = Poppins({
    display: 'swap',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins'
})

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${poppins.variable}`}>
        <body className='min-h-screen bg-hero-pattern bg-center bg-cover bg-no-repeat '>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
