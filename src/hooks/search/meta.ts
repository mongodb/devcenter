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
    const { asPath, route } = useRouter();
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

            // Using window.history.replaceState instead of next/router's replace because the latter
            // causes the entire page to re-render
            const newUrl = `/developer${slug}${
                pageNumber <= 1 ? '' : `&page=${pageNumber}`
            }`;
            window.history.replaceState(
                { ...window.history.state, as: newUrl, url: newUrl },
                '',
                newUrl
            );

            // replace(
            //     {
            //         pathname: slug,
            //         ...(pageNumber <= 1 ? {} : { query: { page: pageNumber } }),
            //     },
            //     undefined,
            //     {
            //         scroll: false,
            //         shallow: true,
            //     }
            // );
        },
        [buildPageTitle, defaultMetaDescr, slug]
    );

    return [pageTitle, metaDescr, updatePageMeta];
};
