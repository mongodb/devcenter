import { NextApiRequest, NextApiResponse } from 'next';
import { Registry } from 'prom-client';
import { prometheus } from '../../config/prometheus';

const metricsApi = async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Forbidden');

    const authValue = authHeader.split(' ')[1];
    const [username, password] = Buffer.from(authValue, 'base64')
        .toString('utf8')
        .split(':');
    if (
        process.env.PROMETHEUS_AUTH_USER === username &&
        process.env.PROMETHEUS_AUTH_PASS === password
    ) {
        const register = prometheus.getRegistry() as Registry;
        res.setHeader('Content-type', register.contentType);
        return res.send(await register.metrics());
    } else {
        return res.status(401).send('Forbidden');
    }
};

export default metricsApi;
