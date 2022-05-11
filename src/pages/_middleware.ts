import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/redirects';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Rewrites are done in this middleware due to
    // dynamic routing.
    for (const rewrite of rewrites) {
        if (pathname == rewrite.source) {
            if (req.method == 'HEAD') {
                return NextResponse.error();
            }
            return NextResponse.rewrite(rewrite.destination);
        }
    }

    return NextResponse.next();
}
