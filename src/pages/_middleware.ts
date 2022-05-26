import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';
import getConfig from 'next/config';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const { publicRuntimeConfig } = getConfig();

    // Handles consistent navigation search as well as
    // redirect for /learn page.
    console.log(req.nextUrl);
    console.log(pathname);

    const basePath = publicRuntimeConfig.absoluteBasePath;

    if (pathname == '/learn/') {
        const { searchParams } = req.nextUrl;
        const s = searchParams.get('text');
        if (s && s.length > 0) {
            return NextResponse.redirect(`${basePath}/search?s=${s}`);
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
            return NextResponse.redirect(`${basePath}${pathname}`);
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
