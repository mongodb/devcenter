import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(405)
        .setHeader('Content-Type', 'application/json')
        .json({ error: { message: 'Method not allowed.' } });
}
