import { NextApiResponse } from 'next';
import { Registry } from 'prom-client';
import { prometheus } from '../../config/prometheus';

const metricsApi = async (_: any, res: NextApiResponse) => {
    const register = prometheus.getRegistry() as Registry;
    res.setHeader('Content-type', register.contentType);
    res.send(await register.metrics());
};

export default metricsApi;
