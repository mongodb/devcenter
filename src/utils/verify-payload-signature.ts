import { createHmac, timingSafeEqual } from 'crypto';

export const verifyPayloadSigntaure = (payload: any, signature: string) => {
    // https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks
    const secret = process.env['PREVIEW_WEBHOOK_TOKEN'];
    if (!secret) {
        throw Error('Secret not defined');
    }
    const payloadBuffer = Buffer.from(JSON.stringify(payload));
    const payloadSignature =
        'sha256=' +
        createHmac('sha256', secret).update(payloadBuffer).digest('hex');
    const equal = timingSafeEqual(
        Buffer.from(payloadSignature),
        Buffer.from(signature)
    );
    if (!equal) {
        throw Error('Signatures are not equal');
    }
};
