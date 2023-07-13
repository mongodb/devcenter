import Contentstack from 'contentstack';

const stackConfig = {
    api_key: process.env.CS_STACK_API_KEY,
    delivery_token: process.env.CS_DELIVERY_TOKEN,
    environment: 'staging',
    live_preview: {
        management_token: process.env.CS_LIVE_PREVIEW_MANAGEMENT_TOKEN,
        enable: true,
        host: 'api.contentstack.io',
    },
};

export default Contentstack.Stack(stackConfig);
