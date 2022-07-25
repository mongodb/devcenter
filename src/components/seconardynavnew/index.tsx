import MobileView from './mobile';
import DesktopView from './desktop';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const SecondaryNav = () => {
    const { data: session, status } = useSession();
    const [activePath, setActivePath] = useState<string>();
    const { isReady, asPath } = useRouter();
    useEffect(() => {
        if (isReady) {
            setActivePath(asPath);
        }
    }, [isReady, asPath]);

    return (
        <>
            <MobileView />
            <DesktopView activePath={activePath} />
        </>
    );
};

export default SecondaryNav;
