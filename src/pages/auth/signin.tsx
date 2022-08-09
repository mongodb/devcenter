import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Signin() {
    const router = useRouter();
    const { query } = router;
    const { status } = useSession();

    console.log(query);

    useEffect(() => {
        console.log('status', status);
        if (status === 'unauthenticated') {
            signIn('okta');
        } else if (status === 'authenticated') {
            router.push('/test');
        }
    }, [router, status]);

    return <div>Signing in... {status}</div>;
}
