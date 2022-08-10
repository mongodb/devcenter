import OktaProvider from 'next-auth/providers/okta';
import type { NextAuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BASE_PATH } from '../../../utils/format-url-path';
import NextAuth from 'next-auth';

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
            session.firstName = token.firstName;
            session.lastName = token.lastName;
            session.email = token.email;
            return session;
        },
        redirect: async ({ url, baseUrl }) => {
            if (url == '/logout') {
                // Redirect to account portal.
                return `${process.env.ACCOUNT_URL}/account/login?signedOut=true`;
            }

            // Allows relative callback URLs, automatically adding basePath where needed.
            if (url.startsWith(BASE_PATH)) {
                return `${baseUrl}${url}`;
            } else if (url.startsWith('/')) {
                return `${baseUrl}${BASE_PATH}${url}`;
            }
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        // #TODO: rate limit?
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
