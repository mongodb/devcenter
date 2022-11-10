import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { getMetaDescr } from '../../utils/seo';
let pluralize = require('pluralize');

export const useSearchMeta = (pageNumber: number, contentType: string) => {
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
    const updatePageTitle = useCallback(
        pageNumber => {
            const pageTitle = buildPageTitle(pageNumber);
            setPageTitle(pageTitle);
            setMetaDescr(
                defaultMetaDescr && pageNumber > 1
                    ? `${defaultMetaDescr} - Page ${pageNumber}`
                    : defaultMetaDescr
            );
        },
        [buildPageTitle, defaultMetaDescr]
    );

    return [pageTitle, metaDescr, updatePageTitle];
};
