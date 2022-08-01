import type { NextApiRequest, NextApiResponse } from 'next';

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    if (!req.headers.authorization) return res.status(401);
    const token = req.headers.authorization.replace('Bearer ', '').trim();
    if (token !== process.env.REVALIDATE_TOKEN) return res.status(401);

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(body.slug);
        return res.json({ revalidated: true });
    } catch (err) {
        console.log(err);
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
};

export default revalidateHandler;
