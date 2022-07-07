import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import logger from '../../utils/logger';
import { verifyPayloadSigntaure } from '../../utils/verify-payload-signature';

const triggerWebhook = async (body: any): Promise<string> => {
    // Would be great to have some sort of alert in here if we can't find the build to close.
    const pr = body['pull_request'];
    const baseBranch = pr.base.ref;
    // Only trigger on PRs to main.
    if (baseBranch !== 'main') {
        return `Did nothing for PR action "${body.action}" because it is not a PR to main`;
    }
    const headers = {
        Authorization: `Bearer ${process.env['DRONE_TOKEN']}`,
    };
    const headBranch = pr.head.ref;

    if (headBranch !== 'DEVHUB-1317') {
        return 'Did nothing because we are still testing this';
    }

    // Only build on opened, reopened, or synchronized (when the pr is open).
    const shouldBuild =
        ['opened', 'reopened'].includes(body.action) ||
        (body.action === 'synchronize' && pr.state === 'open');

    if (shouldBuild) {
        // Trigger our custom event in our drone pieline.
        const buildEndpoint = `https://drone.corp.mongodb.com/api/repos/mongodb/devcenter/builds?branch=${headBranch}&number=${body.number}`;
        await axios.post(buildEndpoint, {}, { headers });
        return 'Successfully triggered preview build';
    } else if (body.action === 'closed') {
        // Find the 100 most recent builds (that's as high as I can go in 1 request, the API does paginate though so we can do more if needed),
        // And find the build that matches the head branch of the PR. Then promote it to "preview-graveyard", which will uninstall the deployment.
        const allBuildsEndpoint =
            'https://drone.corp.mongodb.com/api/repos/mongodb/devcenter/builds?per_page=100';
        const allBuildsResponse = await axios.get(allBuildsEndpoint);
        const allBuilds = allBuildsResponse.data;

        const build = allBuilds.find((b: any) => b.source === headBranch);

        const promoteEndpoint = `https://drone.corp.mongodb.com/api/repos/mongodb/devcenter/builds/${build.number}/promote?target=preview-graveyard&number=${body.number}`;

        await axios.post(promoteEndpoint, {}, { headers });
        return 'Successfully triggered preview cleanup';
    }
    return `Did nothing for PR action "${body.action}" with state "${pr.state}"`;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('This is a POST-only endpoint.');
    }

    // If we don't have this header or if the event is not a PR somehow, don't trigger.
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
    console.log(responseMessage);
    return res.status(200).send(responseMessage);
};
