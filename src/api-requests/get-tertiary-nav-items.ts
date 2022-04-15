import { TertiaryNavItem } from '../components/tertiary-nav/types';

const getTertiaryNavItems = (slug: string): TertiaryNavItem[] => {
    const items = [
        {
            title: 'Quickstarts',
            url: `/products/${slug}/quickstarts`,
        },
        {
            title: `Articles`,
            url: `/products/${slug}/articles`,
        },
        {
            title: `Courses`,
            url: `/products/${slug}/courses`,
        },
        {
            title: `Community Discussion`,
            url: `https://www.mongodb.com/community/forums/`,
        },
        {
            title: `Documentation`,
            url: `https://docs.mongodb.com/`,
        },
        {
            title: `News & Announcements`,
            url: `https://www.mongodb.com/news`,
        },
        {
            title: `Demo Apps`,
            url: `/products/${slug}/demoapps`,
        },
        {
            title: `Stack Overflow`,
            url: `https://stackoverflow.com/`,
        },
        {
            title: `Podcasts`,
            url: `/products/${slug}/podcasts`,
        },
        {
            title: `Tutorials`,
            url: `/products/${slug}/tutorials`,
        },
        {
            title: `Videos`,
            url: `/products/${slug}/videos`,
        },
    ];

    const returnItmes =
        slug === 'atlas'
            ? items
            : slug === 'data-lake'
            ? items.slice(0, 5)
            : slug === 'vs-code'
            ? items.slice(0, 2)
            : [];
    return returnItmes;
};

export default getTertiaryNavItems;
