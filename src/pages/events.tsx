import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';

import ContentTypePage from '../page-templates/content-type-page';
import { ContentTypePageProps } from '../page-templates/content-type-page/types';
import { getContentTypePageData } from '../page-templates/content-type-page/content-type-data';
import { parsePageNumber } from '../utils/page-type-factory';
import { isValidPage } from '../components/search/utils';
import {
    LocationBox,
    SearchBox,
    SearchResults,
    SortBox,
} from '../components/search';
import { searchWrapperStyles } from '../components/search/styles';
import {
    Button,
    ESystemIconNames,
    HorizontalRule,
    TypographyScale,
} from '@mdb/flora';
import { mockFeatured } from '../mockdata/mock-events-data';
import { Grid } from 'theme-ui';
import Card, { getCardProps } from '../components/card';
import {
    cardListStyles,
    cardSectionListStyles,
} from '../components/card-section/styles';
import { Location } from '../components/icons';
import SecondaryTag from '../components/card/secondary-tag';
import { h5Styles } from '../styled/layout';

const extraSearchResultsStyles = (showFeatured: boolean) => ({
    order: showFeatured ? '4' : '3',
});
const extraSearchResultsHeadingStyles = (showFeatured: boolean) => ({
    ...h5Styles,
    flexGrow: '1',
    flexBasis: showFeatured ? 'auto' : ['100%', null, 'auto'],
    order: '2',
});
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
        searchBoxProps,
        searchBoxProps: { searchString },
        sortBoxProps,
        filterProps: { filters },
        resultsProps,
        resultsProps: { isValidating, results },
    },
    searchMetaProps: { updatePageMeta },
    setMobileFiltersOpen,
    featured,
    pageNumber,
    children,
}) => {
    const showFeatured = !searchString && !filters.length;

    return (
        <div sx={searchWrapperStyles}>
            <SearchBox
                {...searchBoxProps}
                placeholder="Search Events"
                extraStyles={{ flexBasis: ['100%', null, 'calc(66% - 12px)'] }}
            />

            <LocationBox />

            {showFeatured && (
                <Grid
                    columns={3}
                    sx={{ ...cardSectionListStyles('row'), width: '100%' }}
                >
                    {featured.slice(0, 3).map((item, i) => (
                        <Card
                            key={i}
                            {...{
                                ...getCardProps(item, 'medium'),
                                tags: undefined,
                            }}
                            secondaryTag={
                                item.location ? (
                                    <SecondaryTag icon={<Location />}>
                                        {item.location.toUpperCase()}
                                    </SecondaryTag>
                                ) : undefined
                            }
                            sx={{ ...cardListStyles('row'), div: { gap: '0' } }}
                        />
                    ))}
                </Grid>
            )}

            <SearchResults
                {...resultsProps}
                pageNumber={pageNumber}
                updatePageMeta={updatePageMeta}
                extraStyles={extraSearchResultsStyles(showFeatured)}
            />

            <HorizontalRule spacing="large" />

            <SearchResults
                {...resultsProps}
                pageNumber={pageNumber}
                updatePageMeta={updatePageMeta}
                extraStyles={extraSearchResultsStyles(showFeatured)}
            />

            <HorizontalRule spacing="large" />

            {(!isValidating || showFeatured) && (
                <TypographyScale
                    variant="heading2"
                    sx={extraSearchResultsHeadingStyles(showFeatured)}
                >
                    All Events
                </TypographyScale>
            )}

            <SearchResults
                {...resultsProps}
                pageNumber={pageNumber}
                updatePageMeta={updatePageMeta}
                extraStyles={extraSearchResultsStyles(showFeatured)}
            />

            {children}
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
