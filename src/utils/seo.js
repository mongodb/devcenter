export const CONTENT_ROUTE = '/[...slug]';

export const getMetaDescr = (config, route, asPath) => {
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

export const getCanonicalUrl = (config, route, asPath) => {
    let canonicalUrl = null;
    // if page is an error page or [...slug] content page, then the
    // canonical URL should be unset by default.
    if (route !== '/_error' && route !== CONTENT_ROUTE) {
        canonicalUrl = config.absoluteBasePath + asPath;
    }
    return canonicalUrl;
};