import { useContext, useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import getConfig from 'next/config';
import { useSession } from 'next-auth/react';
import { UnifiedFooter } from '@mdb/consistent-nav';
import { globalStyles, Main } from '../styled/layout';
import { UnifiedNav } from '@mdb/consistent-nav';
import SecondaryNav from './secondary-nav';
import { OverlayContext } from '../contexts/overlay';
import { layers } from '../styled/layout';
import { useEnsureImageAlts } from '../utils/seo';
import { useModalContext } from '../contexts/modal';
import { PaginatedPersonalizationModal } from './modal/personalization';
import { submitPersonalizationSelections } from './modal/personalization/utils';

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
    const { component: hasModalOpen, openModal } = useModalContext();
    const { data: session } = useSession();
    const { publicRuntimeConfig } = getConfig();
    const { absoluteBasePath, accountPortalUrl } = publicRuntimeConfig;

    useEffect(() => {
        if (session && !session?.lastLogin) {
            openModal(
                <PaginatedPersonalizationModal />,
                // Pass default values to PUT if user dismisses the modal so their "lastLogin" flag can be updated
                {
                    onCloseCallback: () =>
                        submitPersonalizationSelections(
                            {
                                followedTags: [],
                                emailPreference: false,
                            },
                            session?.userId
                        ),
                }
            );
        }
    }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

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
