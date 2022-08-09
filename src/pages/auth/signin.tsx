import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
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

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn('okta', { callbackUrl: callbackUrl });
        } else if (status === 'authenticated') {
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
