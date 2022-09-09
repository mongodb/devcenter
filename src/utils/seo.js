export const CONTENT_ROUTE = '/[...slug]';

export const getMetaDescr = (config, route, asPath) => {
    let pageDescription = null;
    if (asPath in config.pageDescriptions) {
        pageDescription = config.pageDescriptions[asPath];
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
