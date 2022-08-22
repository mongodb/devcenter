import { useContext, ReactNode, FunctionComponent } from 'react';
import { Global } from '@emotion/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';
import { UnifiedNavCustom } from '../styled/consistent-nav';
import SecondaryNav from './seconardynavnew/';
import { OverlayContext } from '../contexts/overlay';

const navStyles = {
    '*': { zIndex: '999!important' }, // Give every element in the consistent nav the same z-index.
};

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const { hasOverlay } = useContext(OverlayContext);
    return (
        <>
            <Global styles={globalStyles(!!hasOverlay)} />
            <div sx={navStyles}>
                <UnifiedNavCustom
                    position="static"
                    floraTheme="default"
                    property={{ name: 'DEVHUB', searchParams: [] }}
                />
            </div>
            <SecondaryNav />
            <Main>{children}</Main>
            <UnifiedFooter hideLocale />
        </>
    );
};

export default Layout;
