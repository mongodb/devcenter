import { Counter, Registry, collectDefaultMetrics } from 'prom-client';

class Prometheus {
    register: Registry | null = null;
    counters: any = {};

    initCounters(register: Registry) {
        this.counters['httpErrorResponsesCounter'] = new Counter({
            name: 'devcenter_http_error_responses_total',
            help: 'Total number of error responses received since last reset.',
            labelNames: ['statusCode'], // can be filtered further on status code
        });

        register.registerMetric(this.counters['httpErrorResponsesCounter']);
    }

    initRegistry() {
        const register = new Registry();

        this.initCounters(register);

        // collectDefaultMetrics should only be called once on initialization.
        collectDefaultMetrics({ prefix: 'devcenter_', register: register });
        this.register = register;
    }

    getRegistry() {
        // Should only initialize registry once.
        if (!this.register) {
            this.initRegistry();
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
