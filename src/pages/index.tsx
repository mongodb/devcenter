import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { clientFactory } from '../utils/client-factory';
import { getArticles } from '../api-requests/get-articles';
import { Article } from '../interfaces/article';
import { getSecondaryNavMenu } from '../service/get-secondary-nav-menu';
import { GridLayout, Link, TextInput, TypographyScale } from '@mdb/flora';
import theme from '@mdb/flora/theme';
import styled from '@emotion/styled';

interface HomeProps {
    articles: Article[];
}

const Main = styled.main`
    padding-left: 25px;
    padding-right: 25px;

    .svg-wrapper-top {
        position: relative;

        > svg {
            position: absolute;
            top: -860px;
            left: -150px;
            z-index: -1;
        }
    }

    .svg-wrapper-bottom {
        position: relative;

        > svg {
            position: absolute;
            top: 80px;
            right: -580px;
            z-index: -1;
        }
    }

    .search-input {
        > div {
            width: 100%;
        }
    }

    .last-row {
        margin-bottom: ${theme.space.inc90};
    }

    .card-placeholder {
        position: relative;
        min-height: 300px;
        background-color: #eee;
        border-radius: 4px;

        > span {
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .developer-center-header {
        grid-column: span 6;
        margin-top: ${theme.space.inc50};

        @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
            grid-column: span 8;
        }

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            grid-column: span 10;
        }
    }

    .developer-center-call-to-action {
        display: none;
        grid-column: span 2;
        margin-top: ${theme.space.inc50};

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            display: block;
            grid-column: span 2;
        }
    }

    .developer-center-call-to-action-mobile {
        grid-column: span 6;
        margin-top: ${theme.space.inc50};

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            display: none;
        }
    }

    .developer-center-cards {
        grid-column: span 6;

        @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
            grid-column: span 4;
        }

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            grid-column: span 3;
        }
    }

    .technologies-header {
        margin-top: ${theme.space.section40};
        grid-column: span 6;

        @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
            grid-column: span 8;
        }

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            grid-column: span 12;
        }
    }

    .technologies-cards {
        grid-column: span 3;

        @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
            grid-column: span 4;
        }

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            grid-column: span 3;
        }
    }

    .products-header {
        grid-column: span 6;
        margin-top: ${theme.space.inc50};

        @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
            grid-column: span 8;
        }

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            grid-column: span 10;
        }
    }

    .products-call-to-action {
        display: none;
        grid-column: span 2;
        margin-top: ${theme.space.inc50};

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            display: block;
            grid-column: span 2;
        }
    }

    .products-call-to-action-mobile {
        grid-column: span 6;
        margin-top: ${theme.space.inc50};

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            display: none;
        }
    }

    .products-cards {
        grid-column: span 6;

        @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
            grid-column: span 8;
        }

        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            grid-column: span 4;
        }
    }
`;

const Home: NextPage<HomeProps> = ({ articles }) => {
    const myHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    const myHandleSearch = () => {
        console.log('submit');
    };

    return (
        <Main>
            <div className="svg-wrapper-top">
                <svg
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
                        className="search-hero"
                        sx={{
                            gridColumn: '1 / span 11',
                            textAlign: 'center',
                            marginTop: 'section40',
                            marginBottom: 'section40',
                        }}
                    >
                        <TypographyScale
                            variant="heading1"
                            sx={{ marginBottom: 'inc60' }}
                        >
                            MongoDB Developer Center
                        </TypographyScale>
                        <TypographyScale variant="body1" color="default">
                            More than 100 open source projects, a library of
                            knowledge resources, developer advocates ready to
                            help, and a global community of developers. What
                            will you create?
                        </TypographyScale>
                        <div
                            sx={{ marginTop: 'inc90' }}
                            className="search-input"
                        >
                            <TextInput
                                name="search"
                                label="Search all MongoDB Developer Content"
                                onChange={e => myHandleChange(e)}
                                buttonText="Search"
                                onButtonClick={() => myHandleSearch()}
                            />
                        </div>
                    </div>
                </GridLayout>
                <GridLayout>
                    <div className="developer-center-header">
                        <TypographyScale variant="heading5">
                            Develop in your language
                        </TypographyScale>
                    </div>
                    <div
                        className="developer-center-call-to-action"
                        sx={{ gridColumn: '11 / span 2', marginTop: 'inc50' }}
                    >
                        <Link linkIcon="arrow" linkIconDisableExpand={true}>
                            View All Languages
                        </Link>
                    </div>
                    {Array(4)
                        .fill('Card Placeholder')
                        .map((card, index) => (
                            <div
                                className="card-placeholder developer-center-cards"
                                key={index}
                            >
                                <TypographyScale
                                    variant="body1"
                                    color="default"
                                >
                                    Card Placeholder 1
                                </TypographyScale>
                            </div>
                        ))}
                    <div
                        className="developer-center-call-to-action-mobile"
                        sx={{ gridColumn: '11 / span 2', marginTop: 'inc50' }}
                    >
                        <Link linkIcon="arrow" linkIconDisableExpand={true}>
                            View All Languages
                        </Link>
                    </div>
                </GridLayout>
            </div>
            <div className="svg-wrapper-bottom">
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
                    <div className="technologies-header">
                        <TypographyScale variant="heading5">
                            Integrate MongoDB with the technologies you use
                        </TypographyScale>
                    </div>
                    {Array(9)
                        .fill('Card Placeholder')
                        .map((card, index) => (
                            <div
                                className="card-placeholder technologies-cards"
                                key={index}
                            >
                                <TypographyScale
                                    variant="body1"
                                    color="default"
                                >
                                    Card Placeholder
                                </TypographyScale>
                            </div>
                        ))}
                </GridLayout>
                <GridLayout className="last-row">
                    <div className="products-header">
                        <TypographyScale variant="heading5">
                            Start building with these MongoDB products
                        </TypographyScale>
                    </div>
                    <div className="products-call-to-action">
                        <Link linkIcon="arrow" linkIconDisableExpand={true}>
                            View All Products
                        </Link>
                    </div>
                    {Array(3)
                        .fill('Card Placeholder')
                        .map((card, index) => (
                            <div
                                className="card-placeholder products-cards"
                                key={index}
                            >
                                <TypographyScale
                                    variant="body1"
                                    color="default"
                                >
                                    Card Placeholder
                                </TypographyScale>
                            </div>
                        ))}
                    <div className="products-call-to-action-mobile">
                        <Link linkIcon="arrow" linkIconDisableExpand={true}>
                            View All Products
                        </Link>
                    </div>
                </GridLayout>
            </div>
        </Main>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({}) => {
    const client = clientFactory('ApolloREST', process.env.STRAPI_URL);
    const articles = await getArticles(client);
    const secNav = await getSecondaryNavMenu();
    console.log(JSON.stringify(secNav));
    return {
        props: { articles },
    };
};
