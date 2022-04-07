import React from 'react';
import { Global } from '@emotion/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';

import ConsistentNav from './consistent-nav';
import SecondaryNavBarDup from './scondarynavdup';

const Layout: React.FunctionComponent = ({ children }) => {
    return (
        <>
            <Global styles={globalStyles} />
            <ConsistentNav />
            <SecondaryNavBarDup />
            <Main>{children}</Main>
            <UnifiedFooter hideLocale />
        </>
    );
};

export default Layout;
