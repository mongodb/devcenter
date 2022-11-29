import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

async function locationSearchHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // TODO: api keys in env vars
        const request = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.search}&types=(regions)&key=AIzaSyC-a347T-kafCnLscFPxHvaKzbY0hwJVmI`
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
