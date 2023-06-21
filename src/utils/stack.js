import * as Contentstack from 'contentstack';

export const stack = Contentstack.Stack({
    api_key: process.env.api_key,
    delivery_token: process.env.delivery_token,
    environment: process.env.environment,
    live_preview: {
        management_token: process.env.management_token,
        enable: true,
        host: 'api.contentstack.io',
    },
});

export const initializeContentStackSdk = () => {
    return stack;
};
