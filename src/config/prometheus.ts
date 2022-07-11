import { Counter, Registry, collectDefaultMetrics } from 'prom-client';

type NullableRegistry = Registry | null;

class Prometheus {
    register: NullableRegistry = null;
    counters: any = {};

    getRegistry() {
        // Should only initialize registry once.
        if (!this.register) {
            const register = new Registry();
            this.counters['httpErrorResponsesCounter'] = new Counter({
                name: 'devcenter_http_error_responses_total',
                help: 'Total number of error responses received since last reset.',
                labelNames: ['statusCode'], // can be filtered further on status code
            });

            register.registerMetric(this.counters['httpErrorResponsesCounter']);

            // collectDefaultMetrics should only be called once on initialization.
            collectDefaultMetrics({ prefix: 'devcenter_', register: register });
            this.register = register;
        }
        return this.register;
    }

    /**
     * Called when a page has returned an HTTP error response.
     * @param statusCode
     */
    incrementHttpErrorResponse(statusCode: number) {
        if ('httpErrorResponsesCounter' in this.counters) {
            this.counters['httpErrorResponsesCounter']
                .labels({ statusCode: statusCode })
                .inc();
        }
    }
}

declare global {
    var prometheus: Prometheus | undefined;
}

export const prometheus = global.prometheus || new Prometheus();
global.prometheus = prometheus;
