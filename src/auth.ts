import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {clientId, clientSecret} from "@/configs/global";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [GitHub({
        clientId: clientId,
        clientSecret: clientSecret,
        authorization: {
            params: {
                scope: 'read:user user:email repo delete_repo',
            }
        }
    })],
    callbacks: {
        jwt: async ({token, account}) => {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        session: async ({session, token}) => {
            session.accessToken = token.accessToken;
            return session;
        },
        authorized: async ({auth, request}) => {
            const url = new URL(request.nextUrl)

            const isAuthorized = !!auth?.accessToken;

            const isPrivateRoute = request.nextUrl.pathname.startsWith('/dashboard');

            if (!isAuthorized && isPrivateRoute) {
                url.pathname = '/'
                return Response.redirect(url)
            }

            const authRoute = ['/'];
            const isAuthRoute = authRoute.includes(request.nextUrl.pathname)

            if (isAuthorized && isAuthRoute) {
                url.pathname = '/dashboard'
                return Response.redirect(url)
            }

            return true
        }
    }
})