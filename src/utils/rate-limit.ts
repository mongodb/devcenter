// https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/utils/rate-limit.js

import { NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LRU = require('lru-cache');

interface RateLimitOptions {
    max: number;
    ttl: number;
}

const rateLimit = (options: RateLimitOptions) => {
    const ipCache = new LRU({
        max: options.max || 500,
        maxAge: options.ttl || 60000,
    });

    return {
        check: (res: NextApiResponse, limit: number, ip: string) =>
            new Promise((resolve, reject) => {
                const ipCount = ipCache.get(ip) || [0];
                if (ipCount[0] === 0) {
                    ipCache.set(ip, ipCount);
                }
                ipCount[0] += 1;

                const currentUsage = ipCount[0];
                const isRateLimited = currentUsage >= limit;
                res.setHeader('X-RateLimit-Limit', limit.toString());
                res.setHeader(
                    'X-RateLimit-Remaining',
                    isRateLimited ? '0' : (limit - currentUsage).toString()
                );
                if (isRateLimited) {
                    console.log(`IP (${ip}) blocked for too many requests.`);
                    return reject();
                }
                console.log(
                    `IP (${ip}) at ${currentUsage}/${limit} write requests this period.`
                );
                return resolve(null);
            }),
    };
};

export default rateLimit;
