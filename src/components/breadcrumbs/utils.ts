import { Crumb } from './types';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';

const categoryToCrumb: { [key: string]: Crumb } = {
    products: { text: 'Products', url: '/developer/products' },
    languages: { text: 'Languages', url: '/developer/languages' },
    technologies: { text: 'Technologies', url: '/developer/technologies' },
};

export const getBreadcrumbsFromSlug = async (
    slug: string
): Promise<Crumb[]> => {
    const crumbs: Crumb[] = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/developer/topics' },
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
        const metaInfoForTopic = await getMetaInfoForTopic(crumbSlug);
        if (metaInfoForTopic?.tagName) {
            crumbs.push({ text: metaInfoForTopic.tagName, url: crumbSlug });
        }
    }
    return crumbs;
};
