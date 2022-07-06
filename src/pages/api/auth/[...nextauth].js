import OktaProvider from 'next-auth/providers/okta';
import NextAuth from 'next-auth';

const options = {
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
            return token;
        },
        session: async ({ session, user, token }) => {
            return session;
        },
        redirect: async ({ url, baseUrl }) => {
            const basePath = '/developer';
            if (url.endsWith('/developer')) {
                return url;
            }
            return `${url}${basePath}`;
        },
    },
};

export default async function handler(req, res) {
    await NextAuth(req, res, options);
}
