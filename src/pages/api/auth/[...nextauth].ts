import OktaProvider from 'next-auth/providers/okta';
import type { NextAuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import * as Sentry from '@sentry/nextjs';
import { User } from '../../../interfaces/user-preference';

async function getUser(userId: string | unknown): Promise<User> {
    const url = `${process.env.PERSONALIZATION_URL}/user_preferences?userId=${userId}`;
    const apiKey = process.env.REALM_API_KEY || '';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apiKey: apiKey,
        },
    };
    try {
        const req = await fetch(url, options);
        return (await req.json()) as User;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to fetch user preferences.');
    }
}

async function persistNewUser(user: User): Promise<User> {
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
        return (await req.json()) as User;
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
            if (token.userId) {
                const user = await getUser(token.userId);
                if (!user) {
                    const persisted_user: User = await persistNewUser({
                        user_id: token.userId,
                        first_name: token.firstName,
                        last_name: token.lastName,
                        email: token.email,
                        preferences: [],
                        last_login: null,
                        email_preference: false,
                    } as User);
                    const { preferences, last_login, email_preference } =
                        persisted_user;
                    session.preferences = preferences;
                    session.lastLogin = last_login;
                    session.emailPreference = email_preference;
                } else {
                    const { preferences, last_login, email_preference } = user;
                    session.preferences = preferences;
                    session.lastLogin = last_login;
                    session.emailPreference = email_preference;
                }
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
