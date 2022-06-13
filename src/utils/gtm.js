export const GTM_ID = 'GTM-GDFN';

export const pageView = url => {
    window.dataLayer.push({
        event: 'pageView',
        page: url,
    });
};
