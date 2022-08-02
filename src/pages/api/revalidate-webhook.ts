import * as Sentry from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import getDynamicPaths from '../../service/get-dynamic-paths';

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const { body } = req;
    if (!req.headers.authorization) return res.status(401).send('Unauthorized');
    const token = req.headers.authorization.replace('Bearer ', '').trim();
    if (token !== process.env.REVALIDATE_TOKEN)
        return res.status(401).send('Unauthorized');

    try {
        if (body.slug) {
            await res.revalidate(`/developer${body.slug}`);
        } else if (body.all) {
            const dynamicPaths = await getDynamicPaths();
            for (const path of dynamicPaths) {
                const { params } = path;
                const slug = params.slug.join('/');
                await res.revalidate(`/developer/${slug}`);
            }
        }
        return res.json({ revalidated: true });
    } catch (err) {
        Sentry.captureException(err);
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
};

export default revalidateHandler;
