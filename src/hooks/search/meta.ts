import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { getCanonicalUrlWithParams, getMetaDescr } from '../../utils/seo';
import { replaceHistoryState } from './utils';

export const useSearchMeta = (
    pageNumber: number,
    slug: string,
    title: string,
    customBuildPageTitle?: (pageNumber: number) => string
) => {
    const { asPath, route } = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { absoluteBasePath } = publicRuntimeConfig;

    const [canonicalUrl, setCanonicalUrl] = useState(
        getCanonicalUrlWithParams(absoluteBasePath, asPath, {
            page: pageNumber.toString(),
        })
    );

    const defaultMetaDescr = getMetaDescr(publicRuntimeConfig, route, asPath);

    const [metaDescr, setMetaDescr] = useState(
        defaultMetaDescr && pageNumber > 1
            ? `${defaultMetaDescr} - Page ${pageNumber}`
            : defaultMetaDescr
    );

    const buildPageTitle = useCallback(
        (pageNumber: number) => {
            if (customBuildPageTitle) {
                return customBuildPageTitle(pageNumber);
            } else {
                const titlePageNo =
                    pageNumber > 1 ? `- Page ${pageNumber}` : '';
                return `${title} ${titlePageNo} | MongoDB`;
            }
        },
        [customBuildPageTitle, title]
    );

    const [pageTitle, setPageTitle] = useState(buildPageTitle(pageNumber));
    const updatePageMeta = useCallback(
        (pageNumber = 1) => {
            const newPageTitle = buildPageTitle(pageNumber);
            setPageTitle(newPageTitle);
            setMetaDescr(
                defaultMetaDescr && pageNumber > 1
                    ? `${defaultMetaDescr} - Page ${pageNumber}`
                    : defaultMetaDescr
            );

            const pathWithoutParams = asPath.split('?')[0];
            setCanonicalUrl(
                getCanonicalUrlWithParams(
                    absoluteBasePath,
                    `${pathWithoutParams}?page=${pageNumber}`,
                    {
                        page: pageNumber.toString(),
                    }
                )
            );

            replaceHistoryState(
                `/developer${slug}${
                    pageNumber <= 1 ? '' : `?page=${pageNumber}`
                }`
            );
        },
        [buildPageTitle, defaultMetaDescr, slug, absoluteBasePath, asPath]
    );

    return { pageTitle, metaDescr, canonicalUrl, updatePageMeta };
};
