import { Crumb } from './types';
import { MetaInfo } from '../../interfaces/meta-info';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';

const categoryToCrumb: { [key: string]: Crumb } = {
    products: { text: 'Products', url: '/products' },
    languages: { text: 'Languages', url: '/languages' },
    technologies: { text: 'Technologies', url: '/technologies' },
};

export const getBreadcrumbsFromSlug = (
    slug: string,
    allMetaInfoResponse?: MetaInfo | null
): Crumb[] => {
    const crumbs: Crumb[] = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/topics' },
    ];
    const slugList = slug.startsWith('/')
        ? slug.split('/').slice(1)
        : slug.split('/');

    const categoryCrumb = categoryToCrumb[slugList[0]];
    if (categoryCrumb) {
        crumbs.push(categoryCrumb);
    }

    for (let i = 2; i < slugList.length; i++) {
        const crumbSlug = '/' + slugList.slice(0, i).join('/');
        const metaInfoForTopic = allMetaInfoResponse
            ? allMetaInfoResponse
            : getMetaInfoForTopic(crumbSlug);
        if (metaInfoForTopic?.tagName) {
            crumbs.push({ text: metaInfoForTopic.tagName, url: crumbSlug });
        }
    }
    return crumbs;
};
