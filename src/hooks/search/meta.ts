import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { getMetaDescr } from '../../utils/seo';
let pluralize = require('pluralize');

export const useSearchMeta = (
    pageNumber: number,
    slug: string,
    contentType: string
) => {
    const { asPath, route, replace, pathname } = useRouter();
    const publicRuntimeConfig = getConfig().publicRuntimeConfig;

    const defaultMetaDescr = getMetaDescr(publicRuntimeConfig, route, asPath);

    const [metaDescr, setMetaDescr] = useState(
        defaultMetaDescr && pageNumber > 1
            ? `${defaultMetaDescr} - Page ${pageNumber}`
            : defaultMetaDescr
    );

    const buildPageTitle = useCallback(
        (pageNumber: number) => {
            const titlePageNo = pageNumber > 1 ? `- Page ${pageNumber}` : '';
            return `${pluralize(contentType)} ${titlePageNo} | MongoDB`;
        },
        [contentType]
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

            replace(
                {
                    pathname: slug,
                    ...(pageNumber <= 1 ? {} : { query: { page: pageNumber } }),
                },
                undefined,
                {
                    scroll: false,
                    shallow: true,
                }
            );
        },
        [buildPageTitle, defaultMetaDescr]
    );

    return [pageTitle, metaDescr, updatePageMeta];
};
