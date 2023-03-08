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
    let req;
    try {
        req = await fetch(url, options);
    } catch (e) {
        logger.error(e);
        Sentry.captureException(e);
        throw new Error('Failed to fetch user preferences.');
    }
    if (req.status !== 200) {
        logger.error({
            msg: 'Failed to get user',
            status: req.status,
            userId,
        });
        throw Error('Failed to fetch user preferences.');
    }
    return await req.json();
}

async function persistNewUser(user: User): Promise<any> {
    const url = `${process.env.BACKEND_URL}/api/user_preferences`;
    let req;
    try {
        req = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        logger.error(e);
        Sentry.captureException(e);
        throw new Error('Failed to persist new user');
    }
    if (req.status !== 200) {
        logger.error({
            msg: 'Failed to post user',
            status: req.status,
            body: user,
        });
        throw Error('Failed to persist new user');
    }
    return await req.json();
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
        session: async ({ session, token }) => {
            session.firstName = token.firstName;
            session.lastName = token.lastName;
            session.email = token.email;
            session.userId = token.sub;
            session.failedToFetch = false;
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
                    const body = {
                        userId: token.sub,
                        firstName: token.firstName,
                        lastName: token.lastName,
                        email: token.email,
                        followedTags: [],
                        lastLogin: null,
                        emailPreference: false,
                    };
                    try {
                        persistedUser = await persistNewUser(body as User);
                    } catch (err) {
                        logger.error({ err, body });
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
