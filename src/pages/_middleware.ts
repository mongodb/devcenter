import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';
import { logRequestData } from '../utils/logger';

const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;

    const origin = req.headers.get('Origin') || '';

    const host = process.env.VERCEL_URL
        ? process.env.VERCEL_URL
        : process.env.HOST_URL;

    const checkRequest = // Only attempt to block POST or PUT API requests (feedback and request content).
        pathname.startsWith('/api/') &&
        !pathname.includes('webhook') &&
        ['POST', 'PUT'].includes(req.method);

    if (checkRequest) {
        let headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
        };

        if (
            origin.replace(/^(https?:|)\/\//, '') !== host // Remove the protocol from the URL.
        ) {
            const userAgent: any = req.ua;
            console.log(
                `${req.ip} blocked because of bad user agent (${userAgent?.browser?.name}) or origin (${origin})`
            );
            const res = new NextResponse(
                JSON.stringify({
                    error: { message: 'Something went wrong' },
                }),
                {
                    status: 500,
                    headers,
                }
            );

            logRequestData(pathname, req.method, res.status);
            return res;
        }
        const res = NextResponse.next();
        for (const key in headers) {
            res.headers.set(key, headers[key]);
        }

        logRequestData(pathname, req.method, res.status);
        return res;
    }

    // Handles consistent navigation search as well as
    // redirect for /learn page.
    if (pathname == '/learn/') {
        const { searchParams } = req.nextUrl;
        const s = searchParams.get('text');
        if (s && s.length > 0) {
            const { href, search } = req.nextUrl;
            req.nextUrl.href = href.replace(search, '');
            req.nextUrl.pathname = '/search';
            req.nextUrl.search = `?s=${s}`;
            req.nextUrl.searchParams.delete('content');
            req.nextUrl.searchParams.delete('text');

            const res = NextResponse.redirect(req.nextUrl);
            logRequestData(pathname, req.method, res.status);
            return res;
        } else if (
            searchParams.get('products') === 'Mobile' ||
            searchParams.get('products') === 'Realm'
        ) {
            if (searchParams.get('content') === 'articles') {
                req.nextUrl.pathname = '/products/realm/articles/';
            } else {
                req.nextUrl.pathname = '/products/realm/';
            }
            const res = NextResponse.redirect(req.nextUrl);
            logRequestData(pathname, req.method, res.status);
            return res;
        } else {
            req.nextUrl.pathname = '/';
            const res = NextResponse.redirect(req.nextUrl);
            logRequestData(pathname, req.method, res.status);
            return res;
        }
    }

    // Rewrites are done in this middleware due to
    // existing issue with SSG and dynamic routing
    // when using built-in rewrites configuration.
    for (const rewrite of rewrites) {
        let destination: string | null = null;

        if (rewrite.regex) {
            const regex = new RegExp(rewrite.regex);
            if (regex.test(pathname)) {
                destination = `${process.env.DEVHUB_URL}${pathname}`;
            }
        }

        if (pathname == rewrite.source || pathname == `${rewrite.source}/`) {
            destination = rewrite.destination;
        }

        if (destination) {
            const res = NextResponse.rewrite(destination);
            logRequestData(pathname, req.method, res.status);
            return res;
        }
    }

    const res = NextResponse.next();
    logRequestData(pathname, req.method, res.status);

    return res;
};

export default withAuth(middleware, {
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        authorized: ({ token }) => {
            return true;
        },
    },
});
