import MobileView from './mobile';
import DesktopView from './desktop';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SecondaryNav = ({ session }: { session: any }) => {
    const [activePath, setActivePath] = useState<string>();
    const { isReady, asPath } = useRouter();
    useEffect(() => {
        if (isReady) {
            setActivePath(asPath);
        }
    }, [isReady, asPath]);

    return (
        <>
            <MobileView session={session} />
            <DesktopView session={session} activePath={activePath} />
        </>
    );
};

export default SecondaryNav;
