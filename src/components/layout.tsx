import { useContext, ReactNode, FunctionComponent } from 'react';
import { Global } from '@emotion/react';
import getConfig from 'next/config';
import { useSession } from 'next-auth/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';
import { UnifiedNav } from '@mdb/consistent-nav';
import SecondaryNav from './seconardynavnew/';
import { OverlayContext } from '../contexts/overlay';
import { layers } from '../styled/layout';

const navStyles = {
    'nav > div > div': {
        zIndex: `${layers.desktopConsistentNavDropdown}!important`,
    }, // Need this so it can display over our secondary nav
    'div[role=menu-wrapper]': {
        zIndex: `${layers.mobileNavMenu}!important`,
    },
};
interface LayoutProps {
    pagePath?: string | null;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
    children,
    pagePath,
}) => {
    const { hasOverlay } = useContext(OverlayContext);
    const { data: session } = useSession();
    const { publicRuntimeConfig } = getConfig();
    const { absoluteBasePath, accountPortalUrl } = publicRuntimeConfig;

    // For sign in handling, the user will need to be able to return
    // to the page they were previously on before clicking the login button. The
    // "fromPagePath" query parameter will hold this value.
    const fromPagePath = pagePath ? `?fromPagePath=${pagePath}` : '';
    // The "fromURI" will be sent to the account portal for redirection, and will
    // include the above information for when it redirects back to DevCenter.
    const signInParams = new URLSearchParams({
        fromURI: `${absoluteBasePath}/auth/signin/${fromPagePath}`,
    });
    const signInUrl = `${accountPortalUrl}?` + signInParams.toString();

    return (
        <>
            <Global styles={globalStyles(!!hasOverlay)} />
            <div sx={navStyles}>
                <UnifiedNav
                    position="static"
                    floraTheme="default"
                    property={{ name: 'DEVHUB', searchParams: [] }}
                    hideTryFree={!!session}
                    hideSignIn={!!session}
                    signInUrl={signInUrl}
                />
            </div>
            <SecondaryNav />
            <Main>{children}</Main>
            <UnifiedFooter hideLocale />
        </>
    );
};

export default Layout;
