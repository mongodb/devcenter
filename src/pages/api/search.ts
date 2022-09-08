import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import axios from 'axios';

const searchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ message: 'This is a POST-only endpoint.' });
    }
    const params = new URLSearchParams(req.query as any).toString();
    const url = process.env.REALM_SEARCH_URL + '/search_devcenter_v2?' + params;

    const response = await axios.post(url, req.body, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'text/plain',
        },
    });
    return res.status(200).json(response.data);
};

export default withSentry(searchHandler);
