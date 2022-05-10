export default function handler(req, res) {
    res.status(200).json({
        status: 'ok',
        revision: process.env.APP_RELEASE,
    });
}
