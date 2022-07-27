export default function handler(req, res) {
    res.status(200).json({
        status: 'ok',
        env: process.env.APP_ENV,
        revision: process.env.APP_RELEASE,
    });
}
