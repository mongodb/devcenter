import {
    GridLayout,
    SideNav,
    Tag,
    TypographyScale,
    Panel,
    List,
    Button,
} from '@mdb/flora';
import Breadcrumbs from '../../components/breadcrumbs';
import CardSection from '../../components/card-section';
import { tagStyles, tagWrapperStyles } from '../../components/card/styles';
import CTALink from '../../components/hero/CTALink';
import TertiaryNav from '../../components/tertiary-nav';
import getTertiaryNavItems from '../../requests/get-tertiary-nav-items';

export interface HeroProps {
    name: string;
    description: string;
}

const nameDummy =
    'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify';
const descriptionDummy =
    'Published February 16, 2022  •  Updated February 16, 2022';
const tags = ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'];

const crumbs = [
    { text: 'MongoDB Developer Center', url: '/' },
    { text: 'Developer Topics', url: '/topics' },
    { text: 'Products', url: '/topics' },
];

const listItems = [
    'Adding Realm as a dependency to an iOS Framework',
    'Document our Realm-Powered Swift Frameworks using DocC',
    'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify',
];

const tertiaryNavItems = getTertiaryNavItems('atlas');

const VideoPage: React.FunctionComponent<HeroProps> = ({
    name = nameDummy,
    description = descriptionDummy,
}) => {
    return (
        <>
            <TertiaryNav items={tertiaryNavItems} topic="atlas" />
            <div
                sx={{
                    paddingBottom: 'inc160',
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],
                }}
            >
                <GridLayout
                    sx={{
                        rowGap: ['inc90', null, null, 'inc130'],
                    }}
                >
                    <div
                        sx={{
                            display: ['none', null, null, null, 'block'],
                            gridColumn: [
                                'span 6',
                                null,
                                'span 8',
                                'span 12',
                                'span 3',
                            ],
                            nav: {
                                position: 'static' as 'static',
                            },
                        }}
                    >
                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>
                    <div
                        sx={{
                            gridColumn: [
                                'span 6',
                                null,
                                'span 8',
                                'span 12',
                                '4 /span 6',
                            ],
                        }}
                    >
                        <Breadcrumbs crumbs={crumbs} />
                        <TypographyScale
                            variant="heading2"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                            }}
                        >
                            {name}
                        </TypographyScale>
                        <TypographyScale
                            customElement="h3"
                            variant="body4"
                            color="secondary"
                            sx={{
                                marginBottom: ['inc20', null, null, '16px'],
                                marginTop: ['inc20', null, null, '16px'],
                            }}
                        >
                            {description}
                        </TypographyScale>
                        {tags && (
                            <div sx={tagWrapperStyles}>
                                {tags?.map(tag => (
                                    <Tag
                                        key={tag}
                                        variant="small"
                                        sx={tagStyles}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        )}
                        <div sx={{ marginTop: '24px', marginBottom: '48px' }}>
                            <img
                                width="696"
                                height="391"
                                src="http://placehold.jp/696x391.png"
                                alt="test"
                            />
                        </div>

                        <TypographyScale
                            variant="body1"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                            }}
                        >
                            In a past post of this series, we showed how easy it
                            was to generate documentation for our frameworks and
                            libraries using DocC and the benefits of doing it.
                            We also saw the different content we can add, like
                            articles, how-tos, and references for our functions,
                            classes, and structs.
                        </TypographyScale>
                        <CTALink
                            customCSS={{
                                marginTop: '24px',
                                marginBottom: '48px',
                            }}
                            text="All MongoDB Videos"
                            url="#"
                        />
                        <hr />
                        <Panel sx={{ marginTop: '96px', padding: '48px' }}>
                            <TypographyScale
                                color="selected"
                                variant="heading6"
                                sx={{
                                    marginBottom: [
                                        'inc20',
                                        null,
                                        null,
                                        'inc40',
                                    ],
                                }}
                            >
                                THIS IS PART OF A SERIES
                            </TypographyScale>
                            <TypographyScale
                                customElement="h2"
                                variant="body4"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            >
                                {`DocC: Apple's Documentation Compiler`}
                            </TypographyScale>
                            <TypographyScale
                                customElement="h2"
                                variant="body4"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            >
                                Up Next
                            </TypographyScale>
                            <TypographyScale
                                customElement="h2"
                                variant="body4"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            >
                                Continuously Building and Hosting our Swift DocC
                                Documentation using Github Actions and Netlify
                            </TypographyScale>
                            <Button
                                sx={{ marginBottom: '40px' }}
                                variant="secondary"
                            >
                                Continue
                            </Button>
                            <hr />
                            <TypographyScale
                                customElement="h2"
                                variant="body4"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '40px'],
                                }}
                            >
                                More in this series
                            </TypographyScale>
                            <List
                                glyph="circle"
                                items={listItems}
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            />
                        </Panel>
                        <TypographyScale variant="heading5">
                            Related
                        </TypographyScale>
                        {/* {
                                contentRows.map(contentRow => {
                                    const contentType = contentRow[0].category;
                                    const direction =
                                        contentType === 'Podcast'
                                            ? 'column'
                                            : 'row';
                                    return (
                                        <CardSection
                                            key={contentType}
                                            content={contentRow}
                                            title={`${contentRow[0].category}s`}
                                            direction={direction}
                                        />
                                    );
                                })} */}
                        <Button
                            sx={{ marginBottom: '40px' }}
                            variant="secondary"
                        >
                            Request a _____
                        </Button>
                    </div>
                </GridLayout>
            </div>
        </>
    );
};

export default VideoPage;
