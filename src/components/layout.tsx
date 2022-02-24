import React from 'react';
import { Global } from '@emotion/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';

import ConsistentNav from './consistent-nav';
import SecondaryNavBar from './secondarynav';

const Layout: React.FunctionComponent = ({ children }) => {
    return (
        <>
            <Global styles={globalStyles} />
            <ConsistentNav />
            <SecondaryNavBar />
            <Main>{children}</Main>
            <UnifiedFooter hideLocale />
        </>
    );
};

export default Layout;
