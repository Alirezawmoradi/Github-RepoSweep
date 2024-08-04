import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
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
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
        authorization: {
            params: {
                scope: 'read:user user:email repo',
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
        }
    }
})