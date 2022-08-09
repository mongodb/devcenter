import OktaProvider from 'next-auth/providers/okta';
import type { NextAuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

const PROFILE_URL = `${process.env.OKTA_ISSUER}/api/v1/users/me`;

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        OktaProvider({
            clientId: process.env.OKTA_CLIENT_ID as string,
            clientSecret: process.env.OKTA_CLIENT_SECRET as string,
            issuer: process.env.OKTA_ISSUER,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, account, profile }) => {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.firstName = profile.firstName;
                token.lastName = profile.lastName;
                token.email = profile.email;
            }
            return token;
        },
        session: async ({ session, user, token }) => {
            // Send properties to the client, like an access_token from a provider.
            // session.accessToken = token.accessToken;
            session.firstName = token.firstName;
            session.lastName = token.lastName;
            session.email = token.email;
            return session;
        },
        // signIn: async ({ user, account, profile, email, credentials }) => {
        //     console.log(
        //         'signInCallback',
        //         user,
        //         account,
        //         profile,
        //         email,
        //         credentials
        //     );
        //     const isAllowedToSignIn = true;
        //     if (isAllowedToSignIn) {
        //         console.log('isAllowedToSignIn');
        //         return true;
        //     } else {
        //         // Return false to display a default error message
        //         return false;
        //         // Or you can return a URL to redirect to:
        //         // return '/unauthorized'
        //     }
        // },
    },
};

export default async function nextAuthHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await NextAuth(req, res, nextAuthOptions);
}
