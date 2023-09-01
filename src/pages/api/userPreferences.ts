import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import logger from '../../utils/logger';

async function userPreferencesHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const request = await fetch(
            `${process.env.BACKEND_URL}/api/user_preferences/${''}`,
            {
                method: req.method,
                body: req.body,
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.BACKEND_API_KEY || '',
                },
            }
        );
        if (request.status === 200) {
            const response = await request.json();
            return res
                .status(request.status)
                .json({ data: response, error: false });
        } else {
            // Set this to enable refreshing on error.
            logger.error({
                msg: 'Failed to update user preferences',
                status: request.status,
                body: req.body,
                userId: 'session?.userId',
            });
            res.setHeader('Cache-Control', 'no-store, max-age=0');
            return res
                .status(request.status)
                .json({ data: {}, error: request.statusText });
        }
    } catch (err) {
        // Set this to enable refreshing on error.
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        return res.status(400).json({
            error: 'Could not update user preferences',
            data: [],
        });
    }
}

export default withSentry(userPreferencesHandler);
