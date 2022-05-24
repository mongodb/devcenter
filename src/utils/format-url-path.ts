/**
 * Set URL for base /developer path
 * @param url - any URL
 * @returns the URL corrected with /developer, if applicable
 */
export const getURLPath = (url: string | undefined) => {
    if (typeof url !== 'string') return url;
    if (url.startsWith('#')) return url;
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)
        return url;
    const basePath = '/developer';
    if (!url.startsWith(basePath)) {
        if (url[0] !== '/') {
            return `${basePath}/${url}/`;
        } else {
            return basePath + url + '/';
        }
    }
    return url + '/';
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
