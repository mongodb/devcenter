import { useEffect } from 'react';

export const CONTENT_ROUTE = '/[...slug]';

export const getMetaDescr = (config: any, route: string, asPath: string) => {
    const path =
        asPath && typeof asPath === 'string' ? asPath.split('?')[0] : asPath;
    let pageDescription = null;
    if (path in config.pageDescriptions) {
        pageDescription = config.pageDescriptions[path];
    } else if (route !== CONTENT_ROUTE) {
        // if no mapping found, set default meta description to that of the homepage
        pageDescription = config.pageDescriptions['/'];
    }
    return pageDescription;
};

export const getCanonicalUrl = (config: any, route: string, asPath: string) => {
    let canonicalUrl = null;
    // if page is an error page or [...slug] content page, then the
    // canonical URL should be unset by default.
    if (route !== '/_error' && route !== CONTENT_ROUTE) {
        canonicalUrl = config.absoluteBasePath + asPath;
    }
    return canonicalUrl;
};

export const useEnsureImageAlts = (parent: HTMLElement | undefined | null) => {
    useEffect(() => {
        parent?.querySelectorAll('img').forEach((img: HTMLImageElement) => {
            if (!img.hasAttribute('alt') && img.hasAttribute('src')) {
                // Try to guess an alt name from the filename, if not default to empty string
                const src = img.getAttribute('src') as string;
                const match =
                    /[\/-]([^\/-]+)\.(gif|jpe?g|tiff?|png|webp|bmp|svg)/.exec(
                        src
                    );

                img.setAttribute('alt', (match && match[1]) || '');
            }
        });
    }, [parent]);
};
