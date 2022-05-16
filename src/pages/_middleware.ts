import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

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
