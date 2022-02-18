import React from 'react';
import { Global } from '@emotion/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import {
    globalStyles,
    GlobalWrapper,
    Main,
    MaxWidthFooterContainer,
} from '../styled/layout';

import ConsistentNav from './consistent-nav';
import NavBar from './subnavigation/navbar';

const Layout: React.FunctionComponent = ({ children }) => {
    return (
        <>
            <Global styles={globalStyles} />
            <ConsistentNav />
            <Main>{children}</Main>
            <UnifiedFooter hideLocale />
        </>
    );
};

export default Layout;
