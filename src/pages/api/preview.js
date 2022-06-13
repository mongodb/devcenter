export default function handler(req, res) {
    if (
        req.query.secret !== process.env.PREVIEW_SECRET_KEY ||
        !req.query.redirect
    ) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    res.redirect('/developer/preview' + req.query.redirect);
}
