import React from 'react';
import { Global } from '@emotion/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';
import { UnifiedNavCustom } from '../styled/consistent-nav';
import SecondaryNav from './seconardynavnew/';

const Layout: React.FunctionComponent = ({ children }) => {
    return (
        <>
            <Global styles={globalStyles} />
            <UnifiedNavCustom
                position="sticky"
                floraTheme="default"
                property={{ name: 'DEVHUB', searchParams: [] }}
            />
            <SecondaryNav />
            <Main>{children}</Main>
            <UnifiedFooter hideLocale />
        </>
    );
};

export default Layout;
