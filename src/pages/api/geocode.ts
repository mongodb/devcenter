import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

async function geocodeHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const request = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.latlng}&result_type=locality&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );

        const { results = [], error_message = '' } = await request.json();
        return res
            .status(request.status)
            .json({ results, error: error_message });
    } catch (err) {
        return res.status(500).json({
            error: 'An error occured trying to get Geocode data',
            results: [],
        });
    }
}

export default withSentry(geocodeHandler);
