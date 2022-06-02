import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res
            .status(405)
            .json({ message: 'This is a PUT-only endpoint.' });
    }
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
    return res.status(200).json(response.data);
};
