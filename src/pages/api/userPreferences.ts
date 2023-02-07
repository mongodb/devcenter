import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

async function userPreferencesHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const request = await fetch(
            `${process.env.PERSONALIZATION_URL}/user_preferences?userId=${req.query.userId}`,
            {
                method: req.method,
                body: req.body,
                headers: {
                    apiKey: process.env.REALM_API_KEY || '',
                },
            }
        );
        if (request.status === 200) {
            // There's no current plans to display success/failure of PUT in the UI, just return the response for now
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
