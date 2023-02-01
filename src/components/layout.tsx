import { useContext, useState } from 'react';
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { useSession } from 'next-auth/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';
import { UnifiedNav } from '@mdb/consistent-nav';
import SecondaryNav from './secondary-nav';
import { OverlayContext } from '../contexts/overlay';
import { layers } from '../styled/layout';
import { useEnsureImageAlts } from '../utils/seo';
import { useModalContext } from '../contexts/modal';
import getSignInURL from '../utils/get-sign-in-url';

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
    const { component: hasModalOpen } = useModalContext();
    const { data: session } = useSession();

    const signInUrl = getSignInURL(pagePath);

    // SEO workaround because unified nav/footer doesn't set their image alts properly
    const [layoutRef, setLayoutRef] = useState<HTMLElement | null>();
    useEnsureImageAlts(layoutRef);

    return (
        <div ref={ref => setLayoutRef(ref)}>
            <Global
                // TODO: using globalStyles as func call might be producing performance bottleneck
                styles={css`
                    ${emotionNormalize}
                    ${globalStyles(!!hasOverlay || !!hasModalOpen)}
                `}
            />
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
