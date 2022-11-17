import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';

import ContentTypePage from '../page-templates/content-type';
import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getContentTypePageData } from '../page-templates/content-type/content-type-data';
import { parsePageNumber } from '../utils/page-type-factory';
import { isValidPage } from '../components/search/utils';
import {
    LocationBox,
    SearchBox,
    SearchResults,
    SortBox,
} from '../components/search';
import { searchWrapperStyles } from '../components/search/styles';
import { Button, ESystemIconNames } from '@mdb/flora';
import { mockFeatured } from '../mockdata/mock-events-data';
import CardSection, { FeaturedCardSection } from '../components/card-section';
interface EventsPageComponentProps {
    searchProps: any;
    searchMetaProps: any;
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
}

const EventsPageComponent: React.FunctionComponent<
    EventsPageComponentProps & ContentTypePageProps
> = ({
    searchProps: {
        searchProps,
        sortBoxProps,
        filterProps: { filters },
        resultsProps,
    },
    searchMetaProps: { updatePageMeta },
    mobileFiltersOpen,
    setMobileFiltersOpen,
    featured,
    pageNumber,
}) => {
    console.log(resultsProps.results);
    return (
        <div sx={searchWrapperStyles}>
            <SearchBox
                {...searchProps}
                placeholder="Search Events"
                extraStyles={{ flexBasis: ['100%', null, null, '60%'] }}
            />

            <LocationBox />

            <CardSection
                content={featured}
                title="Featured Events"
                extraStyles={{ width: '100%' }}
            />

            <Button
                hasIcon
                iconPosition="right"
                iconStrokeWeight="medium"
                iconName={ESystemIconNames.FILTER_HAMBURGER}
                onClick={() => setMobileFiltersOpen(true)}
                customWrapperStyles={{
                    display: ['block', null, null, 'none'],
                    flexBasis: ['100%', null, 'auto'],
                }}
                customStyles={{
                    display: ['flex', null, null, 'none'],
                    justifyContent: 'center',
                }}
            >
                Filter & Sort
                {!!filters.length && ` (${filters.length})`}
            </Button>

            <SearchResults
                {...resultsProps}
                pageNumber={pageNumber}
                updatePageMeta={updatePageMeta}
            />
        </div>
    );
};

const EventsPage: NextPage<ContentTypePageProps> = props => (
    <ContentTypePage {...props}>
        {props => <EventsPageComponent {...props} />}
    </ContentTypePage>
);

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { query } = context;

    const pageNumber = parsePageNumber(query.page);

    const data = {
        ...(await getContentTypePageData('Event', pageNumber)),
        featured: mockFeatured, // todo: remove this
    };

    if (
        data?.initialSearchContent &&
        data?.initialSearchContent.length > 0 &&
        !isValidPage(data?.initialSearchContent.length, pageNumber)
    ) {
        return {
            notFound: true,
        };
    }

    return {
        props: data,
    };
};

export default EventsPage;
