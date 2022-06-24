import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { logRequestData } from '../../utils/logger';

import rateLimit from '../../utils/rate-limit';

const limiter = rateLimit({
    max: 600, // cache limit of 600 per 30 second period.
    ttl: 30 * 1000,
});

const MAX_CONTENT_REQUEST_PER_PERIOD = 10;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await limiter.check(
            res,
            MAX_CONTENT_REQUEST_PER_PERIOD,
            req.socket.remoteAddress || ''
        );
    } catch {
        res = res.status(500);
        logRequestData(req.url, req.method, res.statusCode, req.headers);

        return res.json({
            error: { message: 'Something went wrong' },
        });
    }

    if (req.method !== 'POST') {
        res = res.status(405);
        logRequestData(req.url, req.method, res.statusCode, req.headers);

        return res.json({ message: 'This is a POST-only endpoint.' });
    }
    try {
        const response = await axios.post(
            process.env.REALM_API_URL + '/request_devhub_content',
            req.body,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            }
        );

        res = res.status(200);
        logRequestData(req.url, req.method, res.statusCode, req.headers);

        return res.json(response.data);
    } catch (err) {
        res = res.status(500);
        logRequestData(req.url, req.method, res.statusCode, req.headers);
        return res.json({ message: 'Something went wrong' });
    }
};
