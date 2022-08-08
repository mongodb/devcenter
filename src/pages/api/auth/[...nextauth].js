import OktaProvider from 'next-auth/providers/okta';
// import type { NextAuthOptions } from "next-auth";
// import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

export const nextAuthOptions = {
    providers: [
        OktaProvider({
            clientId: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            issuer: process.env.OKTA_ISSUER,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, account, profile, session }) => {
            console.log('jwt');
            console.log(token, account, profile, session);
            return token;
        },
        session: async ({ session, user, token }) => {
            console.log('session');
            console.log(session, user, token);
            return session;
        },
        signIn: async ({ user, account, profile, email, credentials }) => {
            console.log(
                'signInCallback',
                user,
                account,
                profile,
                email,
                credentials
            );
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                console.log('isAllowedToSignIn');
                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
    },
};

export default async function nextAuthHandler(req, res) {
    await NextAuth(req, res, nextAuthOptions);
}
