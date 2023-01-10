import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

async function locationDetailsSearchHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const request = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );

        const { result = [] } = await request.json();

        return res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({
            error: 'An error occured trying to get Location Details data',
            results: [],
        });
    }
}

export default withSentry(locationDetailsSearchHandler);
