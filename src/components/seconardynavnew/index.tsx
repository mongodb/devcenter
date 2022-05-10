import MobileView from './mobile';
import DesktopView from './desktop';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SecondaryNav = () => {
    const [activePath, setActivePath] = useState<string>();
    const { isReady, asPath } = useRouter();
    useEffect(() => {
        if (isReady) {
            setActivePath(asPath);
        }
    }, [isReady]);

    return (
        <>
            <MobileView />
            <DesktopView activePath={activePath} />
        </>
    );
};

export default SecondaryNav;
