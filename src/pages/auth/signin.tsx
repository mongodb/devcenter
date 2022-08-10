import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn, useSession, getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getURLPath } from '../../utils/format-url-path';
import { thumbnailLoader } from '../../components/card/utils';

export default function Signin() {
    const router = useRouter();
    const { query } = router;
    const { status } = useSession();

    const callbackUrl = getURLPath(
        query.fromPagePath && typeof query.fromPagePath == 'string'
            ? query.fromPagePath
            : '/'
    );

    // The sign in has to be done client-side since next-auth does not
    // support a way to log in server side. This page will "render"
    // the login process and then redirect the client to either the
    // account portal or the previously visited page (if already logged in).
    useEffect(() => {
        if (status === 'unauthenticated') {
            // https://github.com/nextauthjs/next-auth/issues/45
            // Note: next-auth currently has no way of doing a server side signIn()
            signIn('okta', { callbackUrl: callbackUrl });
        } else if (status === 'authenticated') {
            // Redirect to prior page if already authenticated.
            router.push(callbackUrl as string);
        }
    }, [callbackUrl, router, status]);

    const isLoading = status !== 'authenticated';
    return (
        <div
            style={{
                textAlign: 'center',
                padding: '5%',
            }}
        >
            {isLoading && (
                <Image
                    loader={thumbnailLoader}
                    alt="Loading..."
                    width={116}
                    height={116}
                    src={getURLPath('/loading-animation.gif') as string}
                />
            )}
            <div>Signing in...</div>
        </div>
    );
}
