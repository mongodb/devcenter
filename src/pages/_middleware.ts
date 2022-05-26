import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';

const hostUrl = process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : process.env.HOST_URL;
const httpProtocol = hostUrl == 'localhost:3000' ? 'http' : 'https';
const basePath = '/developer';
const absoluteBasePath = `${httpProtocol}://${hostUrl}${basePath}`;

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Handles consistent navigation search as well as
    // redirect for /learn page.
    if (pathname == '/learn/') {
        const { searchParams } = req.nextUrl;
        const s = searchParams.get('text');
        if (s && s.length > 0) {
            return NextResponse.redirect(`${absoluteBasePath}/search?s=${s}`);
        } else if (
            searchParams.get('products') === 'Mobile' ||
            searchParams.get('products') === 'Realm'
        ) {
            let pathname = '';
            if (searchParams.get('content') === 'articles') {
                pathname = '/products/realm/articles/';
            } else {
                pathname = '/products/realm/';
            }
            return NextResponse.redirect(`${absoluteBasePath}${pathname}`);
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
