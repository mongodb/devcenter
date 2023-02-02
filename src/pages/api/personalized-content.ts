import { NextApiRequest, NextApiResponse } from 'next';
import { MOCK_ARTICLE_CONTENT } from '../../mockdata';

const personalizedContentHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== 'GET') {
        return res
            .status(405)
            .json({ message: 'This is a GET-only endpoint.' });
    }

    // TODO: call api to get personalized content

    return res.status(200).json(MOCK_ARTICLE_CONTENT);
};

export default personalizedContentHandler;
