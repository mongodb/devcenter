import { GridLayout, SideNav, Tag, TypographyScale } from '@mdb/flora';
import Breadcrumbs from '../../components/breadcrumbs';
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
                                '4 /span 9',
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
                            variant="body4"
                            color="secondary"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
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
                        <img
                            width="696"
                            height="391"
                            src="http://placehold.jp/696x391.png"
                            alt="test"
                        />
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
                        <CTALink text="All MongoDB Videos" url="#" />
                    </div>
                </GridLayout>
            </div>
        </>
    );
};

export default VideoPage;
