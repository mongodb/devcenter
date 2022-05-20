import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';

export async function middleware(req: NextRequest) {
    const { origin, pathname } = req.nextUrl;

    // Handles consistent navigation search as well as
    // redirect for /learn page.
    if (pathname == '/learn') {
        const s = req.nextUrl.searchParams.get('text');
        if (s && s.length > 0) {
            return NextResponse.redirect(`${origin}/developer/search?s=${s}`);
        } else {
            return NextResponse.redirect(`${origin}/developer`);
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

        if (pathname == rewrite.source) {
            destination = rewrite.destination;
        }

        if (destination) return NextResponse.rewrite(destination);
    }

    return NextResponse.next();
}
