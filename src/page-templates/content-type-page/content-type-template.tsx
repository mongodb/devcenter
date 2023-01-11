import * as Sentry from '@sentry/nextjs';
import { useMemo, useState } from 'react';
import { Button } from '@mdb/flora';
import { pageWrapper } from '../../styled/layout';

import Hero from '../../components/hero';
import RequestContentModal from '../../components/request-content-modal';
import { useSearchMeta } from '../../hooks/search/meta';
import { shouldRenderRequestButton } from './utils';
import { CTAContainerStyles } from '../../components/hero/styles';
import { NextSeo } from 'next-seo';
import { ContentTypePageProps } from './types';
import useSearch from '../../hooks/search';
import { isEmptyArray } from '../../hooks/search/utils';
import { getRequestBtnText } from '../../utils/page-template-helpers';
import { useRequestContentModal } from '../../contexts/request-content-modal';
import ContentTypeBody from './content-type-body';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');

// Debug for DEVHUB-1501 which is not yet replicable.
// If data is empty, capture an exception for Sentry.
const useEmptyDataDebug = (results: any, error: any) => {
    if (isEmptyArray(results)) {
        Sentry.withScope(scope => {
            scope.setExtra('resultParameters', {
                results,
                error,
            });
            Sentry.captureException(new Error('Result data is empty'));
        });
    }
};

const ContentTypePage: React.FunctionComponent<
    ContentTypePageProps
> = props => {
    const {
        description,
        contentType,
        initialSearchContent,
        pageNumber,
        slug,
        children: ChildComponent = ContentTypeBody,
    } = props;

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const requestButtonText = getRequestBtnText(contentType);

    const { setModalStage } = useRequestContentModal();
    const searchMetaProps = useSearchMeta(
        pageNumber,
        slug,
        pluralize(contentType)
    );
    const { pageTitle, metaDescr, updatePageMeta, canonicalUrl } =
        searchMetaProps;
    const searchProps = useSearch(
        initialSearchContent,
        updatePageMeta,
        contentType,
        slug
    );
    const {
        resultsProps: { results, error },
    } = searchProps;

    useEmptyDataDebug(results, error);

    const heroCTAs = useMemo(
        () =>
            shouldRenderRequestButton(contentType) ? (
                <div sx={CTAContainerStyles}>
                    <Button
                        variant="secondary"
                        onClick={() => setModalStage('text')}
                        size="large"
                    >
                        {requestButtonText}
                    </Button>
                </div>
            ) : null,
        [contentType, requestButtonText] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <>
            <NextSeo
                description={metaDescr}
                {...(canonicalUrl ? { canonical: canonicalUrl } : {})}
                title={pageTitle}
            />
            <Hero
                crumbs={[
                    {
                        text: 'MongoDB Developer Center',
                        url: '/',
                    },
                ]}
                name={pluralize(contentType)}
                description={description}
                ctas={heroCTAs}
            />
            <div sx={pageWrapper}>
                <ChildComponent
                    searchProps={searchProps}
                    searchMetaProps={searchMetaProps}
                    mobileFiltersOpen={mobileFiltersOpen}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    {...props}
                />
            </div>
            <RequestContentModal contentCategory={contentType} />
        </>
    );
};

export default ContentTypePage;