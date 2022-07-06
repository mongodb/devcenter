import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import logger from '../../utils/logger';
import { verifyPayloadSigntaure } from '../../utils/verify-payload-signature';

const triggerWebhook = async (body: any): Promise<string> => {
    if (['opened', 'reopened', 'synchronize'].includes(body.action)) {
        const branch = body['pull_request'].head.ref;
        const droneEndpoint = `https://drone.corp.mongodb.com/api/repos/mongodb/devcenter/builds?branch=${branch}&number=${body.number}`;
        console.log('ENDPOINT', droneEndpoint);
        const headers = {
            Authorization: `Bearer ${process.env['DRONE_TOKEN']}`,
        };
        await axios.post(droneEndpoint, {}, { headers });
        return 'Successfully triggered preview build';
    } else if (body.action === 'closed') {
        const allBuildsEndpoint =
            'https://drone.corp.mongodb.com/api/repos/mongodb/devcenter/builds';
        const allBuildsResponse = await axios.get(allBuildsEndpoint);
        const allBuilds = allBuildsResponse.data;
        console.log(allBuilds.length);

        const branch = body['pull_request'].head.ref;
        const build = allBuilds.find((b: any) => b.source === branch);
        console.log(build);

        const droneEndpoint = `https://drone.corp.mongodb.com/api/repos/mongodb/devcenter/builds/${build}/promote?target=preview-graveyard&number=${body.number}`;
        console.log('ENDPOINT', droneEndpoint);
        const headers = {
            Authorization: `Bearer ${process.env['DRONE_TOKEN']}`,
        };
        await axios.post(droneEndpoint, {}, { headers });
        return 'Successfully triggered preview cleanup';
    }
    return `Did nothing for action "${body.action}"`;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('This is a POST-only endpoint.');
    }

    const event = req.headers['x-github-event'];
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
    const responseMessage = await triggerWebhook(req.body);
    return res.status(200).send(responseMessage);
};
