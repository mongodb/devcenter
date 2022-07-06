import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import logger from '../../utils/logger';
import { verifyPayloadSigntaure } from '../../utils/verify-payload-signature';

const triggerWebhook = async (body: any) => {
    if (['closed', 'reopened'].includes(body.action)) {
        const branch = encodeURIComponent(body['pull_request'].head.ref);
        const droneEndpoint = `https://drone.corp.mongodb.com/api/repos/mongodb/devcenter/builds?branch=${branch}&number=${body.number}&action=${body.action}`;
        console.log('ENDPOINT', droneEndpoint);
        const headers = {
            Authorization: `Bearer ${process.env['DRONE_TOKEN']}`,
        };
        const resp = await axios.post(droneEndpoint, {}, { headers });
        console.log(resp.data);
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('This is a POST-only endpoint.');
    }

    const event = req.headers['x-github-event'];
    // if (!event || Array.isArray(event) || event !== 'ping') {
    if (!event || Array.isArray(event) || event !== 'pull_request') {
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

    await triggerWebhook(req.body);
    return res.status(200).send('Successfully triggered preview build.');
};
