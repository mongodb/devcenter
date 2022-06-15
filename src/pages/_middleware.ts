import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';
import rateLimit from '../utils/rate-limit';

// https://github.com/vercel/next.js/tree/canary/examples/api-routes-rate-limit
// Modified version of this ^^^

const limiter = rateLimit({
    max: 600, // cache limit of 600 per 30 second period.
    ttl: 30 * 1000,
});

const MAX_FEEDBACK_PER_PERIOD = 10; // 10 requests per 30 seconds per IP.

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const origin = req.headers.get('Origin') || '';

    const host = process.env.VERCEL_URL
        ? process.env.VERCEL_URL
        : process.env.HOST_URL;

    const checkRequest = // Only attempt to block POST or PUT API requests (feedback and request content).
        pathname.startsWith('/api/') && ['POST', 'PUT'].includes(req.method);

    if (checkRequest) {
        let headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
        };

        // Rate limit
        try {
            await limiter.check(headers, MAX_FEEDBACK_PER_PERIOD, req.ip || '');
        } catch {
            return new NextResponse(
                JSON.stringify({
                    error: { message: 'Something went wrong' },
                }),
                {
                    status: 500,
                    headers,
                }
            );
        }

        // Minimal bot detection by checking the user agent for real browser info.
        if (
            !req.ua?.browser?.name ||
            origin.replace(/^(https?:|)\/\//, '') !== host // Remove the protocol from the URL.
        ) {
            console.log(
                `${req.ip} blocked because of bad user agent (${req.ua?.browser?.name}) or origin (${origin})`
            );
            return new NextResponse(
                JSON.stringify({
                    error: { message: 'Something went wrong' },
                }),
                {
                    status: 500,
                    headers,
                }
            );
        }
        const res = NextResponse.next();
        for (const key in headers) {
            res.headers.set(key, headers[key]);
        }
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

            return NextResponse.redirect(req.nextUrl);
        } else if (
            searchParams.get('products') === 'Mobile' ||
            searchParams.get('products') === 'Realm'
        ) {
            if (searchParams.get('content') === 'articles') {
                req.nextUrl.pathname = '/products/realm/articles/';
            } else {
                req.nextUrl.pathname = '/products/realm/';
            }
            return NextResponse.redirect(req.nextUrl);
        } else {
            req.nextUrl.pathname = '/';
            return NextResponse.redirect(req.nextUrl);
        }
    }

    // Rewrites are done in this middleware due to
    // existing issue with SSG and dynamic routing
    // when using built-in rewrites configuration.
    for (const rewrite of rewrites) {
        let destination = null;

        if (rewrite.regex) {
            const regex = new RegExp(rewrite.regex);
            if (regex.test(pathname)) {
                destination = `${process.env.DEVHUB_URL}${pathname}`;
            }
        }

        if (pathname == rewrite.source || pathname == `${rewrite.source}/`) {
            destination = rewrite.destination;
        }

        if (destination) return NextResponse.rewrite(destination);
    }

    return NextResponse.next();
}
