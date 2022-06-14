// https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/utils/rate-limit.js

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
        check: (
            headers: { [key: string]: string },
            limit: number,
            ip: string
        ) =>
            new Promise((resolve, reject) => {
                const ipCount = ipCache.get(ip) || [0];
                if (ipCount[0] === 0) {
                    ipCache.set(ip, ipCount);
                }
                ipCount[0] += 1;

                const currentUsage = ipCount[0];
                const isRateLimited = currentUsage >= limit;
                headers['X-RateLimit-Limit'] = limit.toString();
                headers['X-RateLimit-Remaining'] = isRateLimited
                    ? '0'
                    : (limit - currentUsage).toString();

                return isRateLimited ? reject() : resolve(null);
            }),
    };
};

export default rateLimit;
