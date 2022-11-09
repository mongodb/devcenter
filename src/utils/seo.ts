import { useEffect } from 'react';

export const CONTENT_ROUTE = '/[...slug]';
export const CONTENT_TYPE_ROUTES = [
    '/articles',
    '/code-examples',
    '/languages',
    '/quickstarts',
    '/news',
    '/podcasts',
    '/tutorials',
    '/videos',
];

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

export const shouldDefineDefaultCanonical = (route: string) => {
    if (
        route === '/_error' ||
        route === CONTENT_ROUTE ||
        CONTENT_TYPE_ROUTES.includes(route)
    ) {
        return false;
    }
    return true;
};

export const getCanonicalUrlWithParams = (
    absoluteBasePath: string,
    asPath: string,
    queryParams?: { [key: string]: string }
) => {
    let canonicalUrl: string = absoluteBasePath + asPath;

    // If a page has query params, strip them out of the string and rebuild
    // the canonical URL based on whether it has the valid query params specified
    // by the `queryParams` parameter.
    if (asPath.includes('?')) {
        canonicalUrl = absoluteBasePath + asPath.split('?')[0];

        if (queryParams && Object.keys(queryParams).length > 0) {
            const queryParamsInUrl: URLSearchParams = new URLSearchParams(
                asPath.split('?')[1]
            );

            const canonicalQueryParams: URLSearchParams = new URLSearchParams();
            for (const queryParam of Object.keys(queryParams)) {
                if (queryParamsInUrl.has(queryParam)) {
                    const matchingParam: string | null =
                        queryParamsInUrl.get(queryParam);
                    if (matchingParam === queryParams[queryParam])
                        canonicalQueryParams.append(queryParam, matchingParam);
                }
            }

            const paramsToInclude = canonicalQueryParams.toString();
            if (!!paramsToInclude) canonicalUrl += `?${paramsToInclude}`;
        }
    }

    return canonicalUrl;
};

export const getCanonicalUrl = (
    absoluteBasePath: string,
    route: string,
    asPath: string
) => {
    // if query strings are in the path, remove them
    if (asPath.includes('?')) {
        return absoluteBasePath + asPath.split('?')[0];
    }
    return absoluteBasePath + asPath;
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
