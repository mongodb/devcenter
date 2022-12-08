/**
 * Set URL for base /developer path
 * @param url - any URL
 * @returns the URL corrected with /developer, if applicable
 */

export const BASE_PATH = '/developer';

export const getURLPath = (url: string | undefined, trailingSlash = true) => {
    if (typeof url !== 'string') return url;
    if (url.startsWith('#')) return url;
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)
        return url;
    const basePath = BASE_PATH;

    let urlPath = url;
    if (!url.startsWith(basePath)) {
        if (url[0] !== '/') {
            urlPath = `${basePath}/${url}`;
        } else {
            urlPath = basePath + url;
        }
    }

    if (trailingSlash && urlPath[urlPath.length - 1] !== '/') {
        urlPath += '/';
    }

    return urlPath;
};

/**
 * Given a list of navigation items, set the url to
 * the proper URL path.
 * @param navItems
 * @returns the navigation items with url property path corrected
 */
export const setURLPathForNavItems = (navItems: any[]) => {
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].url = getURLPath(navItems[i].url);
    }
    return navItems;
};
