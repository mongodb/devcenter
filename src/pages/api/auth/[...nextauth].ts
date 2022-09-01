import OktaProvider from 'next-auth/providers/okta';
import type { NextAuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-mdbdc_' : 'mdbdc_';

export const nextAuthOptions: NextAuthOptions = {
    cookies: {
        pkceCodeVerifier: {
            name: `${cookiePrefix}next-auth.pkce.code_verifier`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: useSecureCookies,
            },
        },
        state: {
            name: `${cookiePrefix}next-auth.state`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: useSecureCookies,
            },
        },
    },
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
    },
};

export default async function nextAuthHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await NextAuth(req, res, nextAuthOptions);
}
