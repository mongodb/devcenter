import * as Sentry from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../utils/logger';
import rateLimit from '../../utils/rate-limit';

const limiter = rateLimit({
    max: 600, // cache limit of 600 per 30 second period.
    ttl: 30 * 1000,
});

const MAX_REQUESTS_PER_PERIOD = 10;

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    if (!process.env.REVALIDATE_TOKEN)
        return res.status(500).send('Something went wrong');

    try {
        await limiter.check(
            res,
            MAX_REQUESTS_PER_PERIOD,
            req.socket.remoteAddress || ''
        );
    } catch {
        return res.status(429).send('Too many requests');
    }

    const { body } = req;
    if (!req.headers.authorization) return res.status(401).send('Unauthorized');
    const token = req.headers.authorization.replace('Bearer ', '').trim();
    if (token !== process.env.REVALIDATE_TOKEN)
        return res.status(401).send('Unauthorized');

    if (!body.slug) {
        return res.status(400).send('Bad Request');
    }

    try {
        const baseUrl = '/developer';
        const slug = body.slug.endsWith('/') ? body.slug : body.slug + '/';

        logger.info(`Revalidating ${slug}`);

        await res.revalidate(`${baseUrl}${slug}`);
        return res.json({ revalidated: true });
    } catch (err) {
        Sentry.captureException(err);
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
};

export default revalidateHandler;
