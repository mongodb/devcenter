import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { nextAuthOptions } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

async function userPreferencesHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, nextAuthOptions);

    try {
        const request = await fetch(
            `${process.env.BACKEND_URL}/api/user_preferences/${session?.userId}`,
            {
                method: req.method,
                body: req.body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (request.status === 200) {
            const response = await request.json();
            return res
                .status(request.status)
                .json({ data: response, error: false });
        } else {
            return res
                .status(request.status)
                .json({ data: {}, error: request.statusText });
        }
    } catch (err) {
        return res.status(400).json({
            error: 'Could not update user preferences',
            data: [],
        });
    }
}

export default withSentry(userPreferencesHandler);
