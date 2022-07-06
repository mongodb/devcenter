import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../utils/logger';
import { verifyPayloadSigntaure } from '../../utils/verify-payload-signature';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('This is a POST-only endpoint.');
    }

    const event = req.headers['x-github-event'];
    if (!event || Array.isArray(event) || event !== 'ping') {
        // if (!event || Array.isArray(event) || event !== 'pull-request') {
        return res.status(400).send('Event must be pull-requst');
    }

    const headerSignature = req.headers['x-hub-signature-256'];
    if (!headerSignature || Array.isArray(headerSignature)) {
        return res.status(400).send('Bad Signature');
    }

    try {
        verifyPayloadSigntaure(req.body, headerSignature);
    } catch (err: any) {
        logger.error(err.message);
        return res.status(400).send('Bad Signature');
    }

    return res.status(200).send('Successfully triggered preview build.');
};
