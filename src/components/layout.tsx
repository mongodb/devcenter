import React from 'react';
import { Global } from '@emotion/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';
import { UnifiedNavCustom } from '../styled/consistent-nav';
import SecondaryNav from './seconardynavnew/';
import { useSession } from 'next-auth/react';

const Layout: React.FunctionComponent = ({ children }) => {
    const { data: session, status } = useSession();
    return (
        <>
            <Global styles={globalStyles} />
            <UnifiedNavCustom
                position="sticky"
                floraTheme="default"
                property={{ name: 'DEVHUB', searchParams: [] }}
                hideTryFree={!!session}
                hideSignIn={!!session}
            />
            <SecondaryNav />
            <Main>{children}</Main>
            <UnifiedFooter hideLocale />
        </>
    );
};

export default Layout;
