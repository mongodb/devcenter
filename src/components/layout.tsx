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
import SecondaryNavBar from './secondarynav';

const Layout: React.FunctionComponent = ({ children }) => {
    return (
        <GlobalWrapper>
            <Global styles={globalStyles} />
            <ConsistentNav />
            <SecondaryNavBar />
            <Main>{children}</Main>
            <MaxWidthFooterContainer>
                <UnifiedFooter hideLocale />
            </MaxWidthFooterContainer>
        </GlobalWrapper>
    );
};

export default Layout;
