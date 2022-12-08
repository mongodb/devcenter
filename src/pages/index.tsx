import type { NextPage } from 'next';
import {
    EThirdPartyLogoVariant,
    GridLayout,
    Link,
    TextInput,
    TypographyScale,
    LogoPaths,
} from '@mdb/flora';

import Image from 'next/image';

import theme from '@mdb/flora/theme';
import { useState } from 'react';
import ShowcaseCard from '../components/showcase-card';
import {
    cardsLanguagesData,
    cardsProductsData,
    cardsTechnologiesData,
} from '../data/homepage';
import { getURLPath } from '../utils/format-url-path';
import { useRouter } from 'next/router';
import { layers, h5Styles } from '../styled/layout';

const getImageSrc = (imageString: string | EThirdPartyLogoVariant) =>
    (
        LogoPaths[imageString as EThirdPartyLogoVariant] ||
        `https://webimages.mongodb.com/_com_assets/icons/${imageString}.svg`
    ).split('?')[0];

const HomepageSearch: React.FunctionComponent = () => {
    const router = useRouter();

    const [query, setQuery] = useState('');
    const handleSearch = () => {
        if (router.isReady) {
            router.push({ pathname: '/search', query: { s: query } });
        }
    };

    return (
        <div
            sx={{
                marginTop: 'inc90',
                '> div': {
                    maxWidth: '100%',
                },
                button: {
                    display: ['none', 'none', 'none', 'block'],
                },
                '& label': { textAlign: 'left' },
            }}
            onKeyPress={e => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
        >
            <TextInput
                name="search"
                label="Search all MongoDB Developer Content"
                onChange={e => setQuery(e.target.value)}
                buttonText="Search"
                onButtonClick={handleSearch}
            />
        </div>
    );
};

const Home: NextPage = () => {
    return (
        <main
            sx={{
                overflow: 'hidden',
                position: 'relative',
                px: ['inc40', null, 'inc50', 'inc70'],

                '> svg': {
                    position: 'absolute',
                    top: '-860px',
                    left: '-150px',
                    zIndex: layers.backdrop,
                },
            }}
        >
            <svg
                id="svg-top"
                width="1800"
                height="1800"
                viewBox="0 0 1800 1800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M452.141 0.00323121L1128.33 2.49631C1251.17 2.96385 1350.51 103.015 1350.04 226.132V230.964C1349.57 355.327 1450.93 455.846 1575.02 454.6C1698.95 453.197 1800 553.404 1800 677.3V678.547C1800 802.131 1699.58 902.027 1576.27 901.248L1353.78 900.002C1104.35 898.599 901.323 1100.42 900.856 1349.92C900.389 1598.65 698.919 1800 450.428 1800C201.626 1800 0 1598.18 0 1349.14V450.703C0 201.197 202.716 -0.931832 452.141 0.00323121Z"
                    fill="#F9EBFF"
                />
            </svg>
            <GridLayout>
                <div
                    sx={{
                        gridColumn: ['span 6', 'span 8', 'span 8', 'span 12'],
                        textAlign: 'center',
                        marginTop: 'section40',
                    }}
                >
                    <TypographyScale
                        variant="heading1"
                        sx={{ marginBottom: 'inc60' }}
                    >
                        MongoDB Developer Center
                    </TypographyScale>
                </div>
                <div
                    sx={{
                        marginBottom: 'section40',
                        gridColumn: [
                            'span 6',
                            'span 8',
                            'span 8',
                            '2 / span 10',
                        ],
                        textAlign: 'center',
                    }}
                >
                    <TypographyScale variant="body1" color="default">
                        The latest MongoDB tutorials, videos and code examples
                        with your languages and tools. A global community of
                        more than 7 million developers. Build something{' '}
                        {`{big}`} with MongoDB.
                    </TypographyScale>
                    <HomepageSearch />
                </div>
            </GridLayout>
            <GridLayout>
                <div
                    sx={{
                        gridColumn: ['span 6', 'span 6', 'span 8', 'span 12'],
                        marginTop: theme.space.inc50,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TypographyScale variant="heading2" customStyles={h5Styles}>
                        Develop in your language
                    </TypographyScale>
                    <div
                        sx={{
                            display: ['none', 'none', 'none', 'block'],
                            gridColumn: [null, null, null, '11 / span 2'],
                        }}
                    >
                        <Link
                            href={getURLPath('/languages')}
                            linkIcon="arrow"
                            linkIconDisableExpand={true}
                        >
                            View All Languages
                        </Link>
                    </div>
                </div>

                {cardsLanguagesData?.map(
                    ({ titleLink, imageString, cta, links }) => (
                        <div
                            sx={{
                                gridColumn: [
                                    'span 6',
                                    'span 6',
                                    'span 4',
                                    'span 3',
                                ],
                            }}
                            key={titleLink.text}
                        >
                            <ShowcaseCard
                                defaultLink
                                sx={{
                                    backgroundColor: 'white',
                                    height: '100%',
                                }}
                                alignment="left"
                                titleLink={titleLink}
                                image={
                                    <Image
                                        src={getImageSrc(imageString)}
                                        height={theme.sizes.inc80}
                                        width={theme.sizes.inc80}
                                        alt={titleLink.text}
                                    />
                                }
                                links={links}
                                cta={cta}
                            />
                        </div>
                    )
                )}
                <div
                    sx={{
                        display: ['block', 'block', 'block', 'none'],
                        gridColumn: ['span 6', 'span 6', 'span 6', null],
                        marginTop: theme.space.inc50,
                    }}
                >
                    <Link
                        href={getURLPath('/languages')}
                        linkIcon="arrow"
                        linkIconDisableExpand={true}
                    >
                        View All Languages
                    </Link>
                </div>
            </GridLayout>
            <div
                sx={{
                    position: 'relative',
                    '> svg': {
                        position: 'absolute',
                        top: '80px',
                        right: '-580px',
                        zIndex: layers.backdrop,
                    },
                }}
            >
                {/* TODO: both icons should be exported out of here */}
                <svg
                    width="1706"
                    height="1706"
                    viewBox="0 0 1706 1706"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M213.25 0C330.964 0 426.5 95.536 426.5 213.25C426.5 330.964 522.036 426.5 639.75 426.5C757.464 426.5 853 330.964 853 213.25C853 95.536 948.536 0 1066.25 0H1492.75C1610.46 0 1706 95.536 1706 213.25V1279.5C1706 1514.93 1514.93 1706 1279.5 1706H213.25C95.536 1706 0 1610.46 0 1492.75V1066.25C0 948.536 95.536 853 213.25 853C330.964 853 426.5 757.464 426.5 639.75V638.043C426.5 520.329 330.964 424.793 213.25 424.793C95.536 424.793 0 329.257 0 211.543C0 95.5354 95.536 0 213.25 0Z"
                        fill="#FBF3FF"
                    />
                </svg>
                <GridLayout>
                    <div
                        sx={{
                            marginTop: theme.space.section40,
                            gridColumn: [
                                'span 6',
                                'span 8',
                                'span 8',
                                'span 12',
                            ],
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TypographyScale
                            variant="heading2"
                            customStyles={h5Styles}
                        >
                            Integrate MongoDB with the technologies you use
                        </TypographyScale>
                        <div
                            sx={{
                                display: ['none', 'none', 'none', 'block'],
                                gridColumn: 'span 2',
                            }}
                        >
                            <Link
                                href={getURLPath('/technologies')}
                                linkIcon="arrow"
                                linkIconDisableExpand={true}
                            >
                                View All Technologies
                            </Link>
                        </div>
                    </div>

                    {cardsTechnologiesData?.map(
                        ({ titleLink, imageString }) => (
                            <div
                                sx={{
                                    gridColumn: [
                                        'span 3',
                                        'span 3',
                                        'span 4',
                                        'span 3',
                                    ],
                                }}
                                key={titleLink.text}
                            >
                                <ShowcaseCard
                                    sx={{ backgroundColor: 'white' }}
                                    alignment="center"
                                    titleLink={titleLink}
                                    image={
                                        <Image
                                            src={getImageSrc(imageString)}
                                            height={theme.sizes.inc60}
                                            width={theme.sizes.inc60}
                                            alt={titleLink.text}
                                        />
                                    }
                                    imageStyles={{
                                        width: ['inc40', null, 'inc60'],
                                    }}
                                    wholeCardHref={titleLink.url}
                                />
                            </div>
                        )
                    )}
                    <div
                        sx={{
                            gridColumn: 'span 6',
                            marginTop: theme.space.inc50,
                            display: ['block', 'block', 'block', 'none'],
                        }}
                    >
                        <Link
                            href={getURLPath('/technologies')}
                            linkIcon="arrow"
                            linkIconDisableExpand={true}
                        >
                            View All Technologies
                        </Link>
                    </div>
                </GridLayout>
                <GridLayout sx={{ marginBottom: theme.space.inc90 }}>
                    <div
                        sx={{
                            gridColumn: [
                                'span 6',
                                'span 8',
                                'span 8',
                                'span 12',
                            ],
                            marginTop: theme.space.inc90,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TypographyScale
                            variant="heading2"
                            customStyles={h5Styles}
                        >
                            Start building with these MongoDB products
                        </TypographyScale>
                        <div
                            sx={{
                                // TODO: check this
                                gridColumn: 'span 2',
                                display: ['none', null, null, 'block'],
                            }}
                        >
                            <Link
                                href={getURLPath('/products')}
                                linkIcon="arrow"
                                linkIconDisableExpand={true}
                            >
                                View All Products
                            </Link>
                        </div>
                    </div>

                    {cardsProductsData?.map(
                        ({
                            titleLink,
                            imageString,
                            links,
                            description,
                            cta,
                        }) => (
                            <div
                                sx={{
                                    gridColumn: [
                                        'span 6',
                                        'span 8',
                                        'span 8',
                                        'span 4',
                                    ],
                                }}
                                key={titleLink.text}
                            >
                                <ShowcaseCard
                                    defaultLink
                                    sx={{
                                        backgroundColor: 'white',
                                        minHeight: '566px',
                                        height: '100%',
                                    }}
                                    alignment="left"
                                    description={description}
                                    titleLink={titleLink}
                                    image={
                                        <Image
                                            src={getImageSrc(imageString)}
                                            height={theme.sizes.inc80}
                                            width={theme.sizes.inc80}
                                            alt={titleLink.text}
                                        />
                                    }
                                    cta={cta}
                                    links={links}
                                />
                            </div>
                        )
                    )}
                    <div
                        sx={{
                            gridColumn: 'span 6',
                            marginTop: theme.space.inc50,
                            display: ['block', null, null, 'none'],
                        }}
                    >
                        <Link
                            href={getURLPath('/products')}
                            linkIcon="arrow"
                            linkIconDisableExpand={true}
                        >
                            View All Products
                        </Link>
                    </div>
                </GridLayout>
            </div>
        </main>
    );
};

export default Home;
