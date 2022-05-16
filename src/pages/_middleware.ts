import { NextRequest, NextResponse } from 'next/server';
import { rewrites } from '../../config/rewrites';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log(pathname);

    // Rewrites are done in this middleware due to
    // existing issue with SSG and dynamic routing
    // when using built-in rewrites configuration.
    for (const rewrite of rewrites) {
        let destination = null;

        if (rewrite.regex) {
            const regex = new RegExp(rewrite.regex);
            if (regex.test(pathname)) {
                destination =
                    rewrite.type == 'external'
                        ? `${process.env.DEVHUB_URL}${pathname}`
                        : `/developer_hub${pathname}`;
            }
        }

        if (pathname == rewrite.source) {
            destination = rewrite.destination;
        }

        if (destination) {
            if (rewrite.type == 'internal') {
                const url = req.nextUrl.clone();
                url.pathname = destination;
                return NextResponse.rewrite(url);
            } else {
                return NextResponse.rewrite(destination);
            }
        }
    }

    return NextResponse.next();
}
