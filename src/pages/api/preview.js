export default function handler(req, res) {
    res.setPreviewData({});
    res.redirect('/developer/preview' + req.query.redirect);
}
