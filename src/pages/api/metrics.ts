import { NextApiResponse } from 'next';
import { prometheus } from '../../config/prometheus';

const metricsApi = async (_: any, res: NextApiResponse) => {
    const register = prometheus.getRegistry();
    res.setHeader('Content-type', register.contentType);
    res.send(await register.metrics());
};

export default metricsApi;
