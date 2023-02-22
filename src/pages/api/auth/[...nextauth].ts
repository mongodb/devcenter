import OktaProvider from 'next-auth/providers/okta';
import type { NextAuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import * as Sentry from '@sentry/nextjs';
import { User } from '../../../interfaces/user-preference';
import logger from '../../../utils/logger';

async function getUser(userId: string | unknown): Promise<any> {
    const url = `${process.env.BACKEND_URL}/api/user_preferences/${userId}`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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

async function persistNewUser(user: User): Promise<any> {
    const url = `${process.env.BACKEND_URL}/api/user_preferences`;
    try {
        const req = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
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
            session.userId = token.sub;
            console.log('Setting Session');
            if (token.sub) {
                let user;
                try {
                    user = await getUser(token.sub);
                } catch (err) {
                    logger.error(err);
                    session.failedToFetch = true;
                    return session;
                }

                if (!user) {
                    let persistedUser;
                    try {
                        persistedUser = await persistNewUser({
                            userId: token.userId,
                            firstName: token.firstName,
                            lastName: token.lastName,
                            email: token.email,
                            followedTags: [],
                            lastLogin: null,
                            emailPreference: false,
                        } as User);
                    } catch (err) {
                        logger.error(err);
                        session.failedToFetch = true;
                        return session;
                    }
                    const { followedTags, lastLogin, emailPreference } =
                        persistedUser;
                    session.followedTags = followedTags;
                    session.lastLogin = lastLogin;
                    session.emailPreference = emailPreference;
                } else {
                    const { followedTags, lastLogin, emailPreference } = user;
                    session.followedTags = followedTags;
                    session.lastLogin = lastLogin;
                    session.emailPreference = emailPreference;
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
