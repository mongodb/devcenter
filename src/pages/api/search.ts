import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import axios from 'axios';

const searchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res
            .status(405)
            .json({ message: 'This is a GET-only endpoint.' });
    }
    const response = await axios.get(
        process.env.REALM_SEARCH_URL + '/search_devcenter_stage',
        { params: req.query }
    );
    return res.status(200).json(response.data);
};

export default withSentry(searchHandler);
