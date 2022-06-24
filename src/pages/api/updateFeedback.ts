import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { logRequestData } from '../../utils/logger';

import rateLimit from '../../utils/rate-limit';

const limiter = rateLimit({
    max: 600, // cache limit of 600 per 30 second period.
    ttl: 30 * 1000,
});

const MAX_FEEDBACK_PER_PERIOD = 10;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('header', req.headers['x-forwarded-for']);
        let ip = req.headers['x-forwarded-for'] || '';
        console.log('IP', ip);
        let realIp: string;
        if (ip?.length) {
            realIp = ip[0];
        } else {
            realIp = (ip as string).split(',')[0];
        }
        console.log('Real IP', realIp);
        await limiter.check(res, MAX_FEEDBACK_PER_PERIOD, realIp.trim() || '');
    } catch {
        res = res.status(500);
        logRequestData(req.url, req.method, res.statusCode, req.headers);

        return res.json({
            error: { message: 'Something went wrong' },
        });
    }

    if (req.method !== 'PUT') {
        res = res.status(405);
        logRequestData(req.url, req.method, res.statusCode, req.headers);

        return res.json({ message: 'This is a PUT-only endpoint.' });
    }
    try {
        const response = await axios.put(
            process.env.REALM_API_URL + '/update_feedback',
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
