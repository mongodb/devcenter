import { NextApiRequest, NextApiResponse } from 'next';
// import { nextAuthOptions } from './auth/[...nextauth]';
// import { unstable_getServerSession } from 'next-auth/next';

const personalizedContentHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== 'GET') {
        return res
            .status(405)
            .json({ message: 'This is a GET-only endpoint.' });
    }

    // const session = await unstable_getServerSession(req, res, nextAuthOptions);

    try {
        const request = await fetch(
            `${process.env.BACKEND_URL}/api/homepage_content/${''}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.BACKEND_API_KEY || '',
                },
            }
        );
        if (request.status === 200) {
            const response = await request.json();
            return res
                .status(request.status)
                .json({ data: response, error: false });
        } else {
            // Set this to enable refreshing on error.
            res.setHeader('Cache-Control', 'no-store, max-age=0');
            return res
                .status(request.status)
                .json({ data: {}, error: request.statusText });
        }
    } catch (err) {
        // Set this to enable refreshing on error.
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        return res.status(400).json({
            error: `Could not get recommended content, ${err}`,
            data: [],
        });
    }
};

export default personalizedContentHandler;
