import React from 'react';
import { Global } from '@emotion/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';

import ConsistentNav from './consistent-nav';
import SecondaryNavBarDup from './secondarynavdup';
import { Hamburger } from './seconardynavnew/hamburger';

const Layout: React.FunctionComponent = ({ children }) => {
    return (
        <>
            <Global styles={globalStyles} />
            <ConsistentNav />
            {/* <SecondaryNavBarDup /> */}
            <div sx={{display: ['block', 'block', 'block', 'none']}}>
            <Hamburger />
            </div>
            {/* <Main>{children}</Main> */}
            {/* <UnifiedFooter hideLocale /> */}
        </>
    );
};

export default Layout;
