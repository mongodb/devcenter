import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

const LOCATION_TYPES = [
    'locality',
    'sublocality',
    'postal_code',
    'administrative_area_level_1',
    'administrative_area_level_2',
];

async function locationSearchHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const request = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
                req.query.search
            }&types=${LOCATION_TYPES.join('|')}&key=${
                process.env.GOOGLE_PLACES_API_KEY
            }`
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
