import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

async function userPreferencesHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const request = await fetch(
            `${process.env.PERSONALIZATION_URL}/user_preferences/${req.query.userId}`,
            {
                method: req.method,
                body: req.body,
            }
        );
        const response = await request.json();

        return res.status(200).json({ data: response });
    } catch (err) {
        return res.status(500).json({
            error: 'Could not update user preferences',
            data: [],
        });
    }
}

export default withSentry(userPreferencesHandler);
