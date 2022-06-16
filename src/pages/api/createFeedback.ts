import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import rateLimit from '../../utils/rate-limit';

const limiter = rateLimit({
    max: 600, // cache limit of 600 per 30 second period.
    ttl: 30 * 1000,
});

const MAX_FEEDBACK_PER_PERIOD = 10;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await limiter.check(
            res,
            MAX_FEEDBACK_PER_PERIOD,
            req.socket.remoteAddress || ''
        );
    } catch {
        return res.status(500).json({
            error: { message: 'Something went wrong' },
        });
    }

    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ message: 'This is a POST-only endpoint.' });
    }
    try {
        const response = await axios.post<{ _id: number }>(
            process.env.REALM_API_URL + '/create_feedback',
            req.body,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            }
        );
        return res.status(200).json(response.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
