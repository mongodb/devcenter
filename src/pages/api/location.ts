import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

async function locationSearchHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const request = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.search}&types=(regions)&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );

        const { predictions = [], error_message = '' } = await request.json();
        return res
            .status(request.status)
            .json({ results: predictions, error: error_message });
    } catch (err) {
        return res.status(500).json({
            error: 'An error occured trying to get Location Search data',
            results: [],
        });
    }
}

export default withSentry(locationSearchHandler);
