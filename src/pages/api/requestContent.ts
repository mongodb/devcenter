import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ message: 'This is a POST-only endpoint.' });
    }
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
    return res.status(200).json(response.data);
};
