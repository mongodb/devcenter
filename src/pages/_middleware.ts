import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

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
