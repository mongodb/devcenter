import { NextApiRequest, NextApiResponse } from 'next';

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.redirect(
        308,
        `${process.env.ACCOUNT_PORTAL_URL}/account/login?signedOut=true`
    );
};

export default logoutHandler;
