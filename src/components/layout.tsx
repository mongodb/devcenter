import { useContext, useState } from 'react';
import { Global } from '@emotion/react';
import getConfig from 'next/config';
import { useSession } from 'next-auth/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';
import { UnifiedNav } from '@mdb/consistent-nav';
import SecondaryNav from './seconardynavnew/';
import { OverlayContext } from '../contexts/overlay';
import { layers } from '../styled/layout';
import { useEnsureImageAlts } from '../utils/seo';

const navStyles = {
    'nav > div > div > ul': {
        zIndex: `${layers.desktopConsistentNavDropdown}!important`,
    }, // Needed so <ul /> list options from consistent nav displays over our secondary nav
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

    // SEO workaround because unified nav/footer doesn't set their image alts properly
    const [layoutRef, setLayoutRef] = useState<HTMLElement | null>();
    useEnsureImageAlts(layoutRef);

    return (
        <div ref={ref => setLayoutRef(ref)}>
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
        </div>
    );
};

export default Layout;
