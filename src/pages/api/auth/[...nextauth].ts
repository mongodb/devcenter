import OktaProvider from 'next-auth/providers/okta';
import type { NextAuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import * as Sentry from '@sentry/nextjs';

async function getUser(userId: string): User | null {
    const query = 'userId=' + userId;
    const url = `${process.env.PERSONALIZATION_URL}/user_preferences?${query}`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apiKey: process.env.REALM_API_KEY,
        },
    };
    try {
        const req = await fetch(url, options);
        return await req.json();
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to fetch user preferences.');
    }
}

async function persistNewUser(user) {
    const url = `${process.env.PERSONALIZATION_URL}/user_preferences`;
    try {
        const req = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            //TODO figure out how to make post calls for API key protected APIs
            // headers: {
            //     'api-key' : process.env.REALM_API_KEY
            // },
            body: JSON.stringify(user),
        });
        return await req.json();
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to persist new user');
    }
}

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
        jwt: async ({ token, account, profile, user }) => {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.firstName = profile.firstName;
                token.lastName = profile.lastName;
                token.email = profile.email;
            }
            if (user) {
                token.userId = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.firstName = token.firstName;
            session.lastName = token.lastName;
            session.email = token.email;
            session.userId = token.userId;
            const user = await getUser(token.userId);
            if (user == null) {
                const newUser = {
                    user_id: token.userId,
                    first_name: token.firstName,
                    last_name: token.lastName,
                    email: token.email,
                    preferences: [],
                    last_login: null,
                };
                const persisted_user = await persistNewUser(newUser);
                const { preferences, last_login } = persisted_user;
                session.preferences = preferences;
                session.lastLogin = last_login;
            } else {
                const { preferences, last_login } = user;
                session.preferences = preferences;
                session.lastLogin = last_login;
            }
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
