import { NextPage, GetStaticProps } from 'next';
import Image from 'next/future/image';
import { Button, Link, TypographyScale } from '@mdb/flora';
import React from 'react';
import { Grid } from 'theme-ui';
import { NextSeo } from 'next-seo';
import theme from '@mdb/flora/theme';

interface Book {
    title: string;
    authors: string[];
    thumbnail: string;
    amazonLink?: string;
}

interface FeaturedBook extends Book {
    publishedDateText: string;
    description: string;
    packtLink?: string;
    preorder?: boolean;
}

interface BooksPageProps {
    featuredBooks: FeaturedBook[];
    relatedBooks: Book[];
}

const LeafIcon: React.FunctionComponent<{
    className?: string;
}> = ({ className }) => (
    <div className={className}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="156"
            height="42"
            viewBox="0 0 156 42"
            fill="none"
        >
            <g clipPath="url(#clip0_156_755)">
                <path
                    d="M12.4999 4.8045C10.8613 2.89724 9.44858 0.948152 9.16209 0.54788C9.13632 0.512035 9.08176 0.512035 9.05599 0.54788C8.7695 0.948152 7.35676 2.89724 5.71817 4.80301C-8.33189 22.4403 7.9358 34.3395 7.9358 34.3395L8.25867 34.5605L8.18136 33.1267L9.06357 14.1586C9.0666 14.1004 9.153 14.1004 9.15603 14.1586L10.0382 33.1267L9.96244 34.5859L10.2838 34.338C10.2823 34.3395 26.5515 22.4403 12.4999 4.8045Z"
                    fill="white"
                />
                <path
                    d="M10.0848 33.0431C10.0848 33.2626 9.10857 34.0811 9.10857 34.0811C9.10857 34.0811 8.13239 33.2611 8.13239 33.0431C8.13239 32.9848 8.00657 33.4194 8.04447 34.09C8.14906 35.9241 8.49618 38.9172 8.49618 38.9172H9.10857H9.72096C9.72096 38.9172 10.0681 35.9241 10.1727 34.09C10.2106 33.4194 10.0848 32.9848 10.0848 33.0431Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_156_755">
                    <rect
                        width="155.227"
                        height="41.1906"
                        fill="white"
                        transform="translate(0 0.520996)"
                    />
                </clipPath>
            </defs>
        </svg>
    </div>
);

const RelatedBookCard: React.FunctionComponent<Book> = ({
    title,
    authors,
    thumbnail,
    amazonLink,
}) => {
    const Tag = amazonLink ? 'a' : 'div';
    const tagProps =
        Tag === 'a'
            ? {
                  target: '_blank',
                  rel: 'noreferrer',
                  href: amazonLink,
              }
            : {};
    return (
        <Tag
            {...tagProps}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '300px',
                alignItems: 'start',
                textAlign: 'left',
            }}
        >
            <div
                sx={{
                    boxSizing: 'content-box',
                    flexShrink: 0,
                    position: 'relative',
                    height: '256px',
                }}
            >
                <Image
                    alt={`${title} thumbnail`}
                    src={thumbnail}
                    width="0"
                    height="0"
                    sizes={`(max-width: ${theme.sizes.breakpoint.xlarge}) 75vw,
                    25vw`}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <TypographyScale
                variant="body3"
                sx={{
                    color: '#fff',
                    margin: '24px 0 4px 0',
                    fontWeight: '700',
                    fontSize: ['14px, null, null, 16px'],
                }}
            >
                {title}
            </TypographyScale>
            <TypographyScale
                variant="body4"
                sx={{ color: '#fff', fontSize: ['14px, null, null, 16px'] }}
            >
                by {authors.join(', ')}
            </TypographyScale>
        </Tag>
    );
};

const FeaturedBookCard: React.FunctionComponent<FeaturedBook> = ({
    title,
    authors,
    thumbnail,
    publishedDateText,
    description,
    amazonLink,
    packtLink,
    preorder,
}) => (
    <div
        sx={{
            display: 'flex',
            flexDirection: ['column', null, 'row'],
            justifyContent: 'center',
            gap: ['24px', null, null, '36px', '106px'],
        }}
    >
        <div
            sx={{
                boxSizing: 'content-box',
                flexShrink: 0,
                position: 'relative',
                height: '311px',
                width: '264px',
            }}
        >
            <Image
                alt={`${title} thumbnail`}
                src={thumbnail}
                width="0"
                height="0"
                sizes={`(max-width: ${theme.sizes.breakpoint.xlarge}) 75vw,
                25vw`}
                style={{ width: '100%', height: 'auto' }}
                loading="eager"
            />
        </div>
        <div
            sx={{
                marginTop: ['inc40', null, 0],
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TypographyScale
                variant="heading6"
                sx={{ color: '#fff', marginBottom: '4px' }}
            >
                {title}
            </TypographyScale>
            <TypographyScale variant="body3" sx={{ color: '#fff' }}>
                {authors.join(', ')} | {publishedDateText}
            </TypographyScale>
            <TypographyScale
                variant="body3"
                sx={{ color: '#fff', my: 'inc40' }}
            >
                {description}
            </TypographyScale>
            <div
                sx={{
                    display: 'flex',
                    flexDirection: ['column', null, 'row'],
                    gap: '24px',
                    alignItems: ['start', null, 'center'],
                }}
            >
                {!!amazonLink && (
                    <Button target="_blank" href={amazonLink}>
                        {!preorder ? 'Buy on Amazon' : 'Preorder on Amazon'}
                    </Button>
                )}
                {!!packtLink && (
                    <Link
                        target="_blank"
                        href={packtLink}
                        linkIcon="arrow"
                        inverse
                    >
                        Purchase on Packt
                    </Link>
                )}
            </div>
            {!!packtLink && !!amazonLink && (
                <TypographyScale
                    sx={{
                        display: ['none', null, 'block'],
                        marginTop: 'inc30',
                        color: '#fff',
                    }}
                    variant="body4"
                >
                    *Packt is the preferred retailer outside of the US
                </TypographyScale>
            )}
        </div>
    </div>
);

const BooksPage: NextPage<BooksPageProps> = ({
    featuredBooks,
    relatedBooks,
}) => {
    return (
        <>
            <NextSeo title={'MongoDB Press'} />
            <div>
                <div sx={{ bg: 'blue80', height: '100%' }}>
                    <a
                        href="https://www.mongodb.com"
                        sx={{
                            boxSizing: 'content-box',
                            flexShrink: 0,
                            position: 'relative',
                            height: '32px',
                            width: '120px',
                            mx: 'auto',
                            paddingBottom: ['28px', null, null, '80px'],
                            paddingTop: ['28px', null, null, '40px'],
                            display: ['none', null, 'block'],
                        }}
                    >
                        <Image
                            alt="MongoDB Logo"
                            src="https://webimages.mongodb.com/_com_assets/cms/kuyj3d95v5vbmm2f4-horizontal_white.svg"
                            width="0"
                            height="0"
                            sizes={`(max-width: ${theme.sizes.breakpoint.xlarge}) 75vw,
                          25vw`}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </a>
                    <a
                        href="https://www.mongodb.com"
                        sx={{
                            display: ['block', null, 'none'],
                            padding: '24px',
                            width: 'min-content',
                        }}
                    >
                        <LeafIcon />
                    </a>
                </div>

                <div
                    sx={{
                        bg: 'black80',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#fff',
                        fontFamily: 'heading',
                        textAlign: 'center',
                    }}
                >
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <TypographyScale
                            variant="heading4"
                            customElement="h1"
                            sx={{ color: '#fff', marginTop: '40px' }}
                        >
                            MongoDB Press
                        </TypographyScale>
                        <TypographyScale variant="body1" sx={{ color: '#fff' }}>
                            A collection of books on MongoDB written by experts
                        </TypographyScale>
                    </div>
                    <div
                        sx={{
                            my: '64px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '64px',
                            maxWidth: '1024px',
                            mx: 'inc40',
                        }}
                    >
                        {featuredBooks.map(book => (
                            <FeaturedBookCard key={book.title} {...book} />
                        ))}
                    </div>
                    <div
                        sx={{
                            width: '100%',
                            bg: 'black70',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            sx={{
                                my: 'inc60',
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '1440px',
                                mx: 'inc40',
                                width: '100%',
                                alignItems: 'start',
                            }}
                        >
                            <TypographyScale
                                variant="heading6"
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                Related Books
                            </TypographyScale>
                            <Grid
                                columns={[1, null, 2, 4]}
                                gap={[48, null, null, 36, 64]}
                                sx={{ width: '100%', marginTop: '24px' }}
                            >
                                {relatedBooks.map(book => (
                                    <RelatedBookCard
                                        key={book.title}
                                        {...book}
                                    />
                                ))}
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BooksPage;

export const getStaticProps: GetStaticProps<{
    featuredBooks: FeaturedBook[];
    relatedBooks: Book[];
}> = async () => {
    const featuredBooks: FeaturedBook[] = [
        {
            title: 'Practical MongoDB Aggregations',
            authors: ['Paul Done'],
            publishedDateText: 'Published Sept. 2023',
            description: `This technical guide takes you on a data-driven journey by teaching you how to streamline data manipulation, resolve data processing bottlenecks, and optimize pipelines. This book is your go-to resource for becoming proficient with the MongoDB aggregation framework. Get 20% off Sept 19th to Dec 1st. US customers, use code: 20MongoDB on Amazon. Discount automatically applied when purchasing from Packt for all countries.`,
            amazonLink:
                'https://www.amazon.com/Practical-MongoDB-Aggregations-developing-aggregation/dp/1835080642/ref=tmm_pap_swatch_0?_encoding=UTF8&amp&qid=1694163751&amp&sr=8-3',
            packtLink:
                'https://www.packtpub.com/product/practical-mongodb-aggregations/9781835080641',
            thumbnail:
                'https://images.contentstack.io/v3/assets/blt39790b633ee0d5a7/blt28d67a372bc7f093/65036a005e99806c7203218d/MongoDB_Practical_Aggregations.png',
        },
        {
            title: 'Mastering MongoDB 7.0',
            authors: [
                'Marko Aleksendric',
                'Arek Borucki',
                'Leandro Domingues',
                'Malak Abu Hammad',
                'Elie Hannouch',
                'Rajesh Nair',
                'Rachelle Palmer',
            ],
            publishedDateText: 'will be published in Nov. 2023',
            description: `Explore the full potential of MongoDB 7.0 with this comprehensive guide. Mastering MongoDB 7.0 offers powerful techniques for efficient data manipulation, application integration, and security. This intermediate-to-master level book helps individuals utilize the latest version of MongoDB to achieve its full potential.`,
            preorder: true,
            amazonLink:
                'https://www.amazon.com/Mastering-MongoDB-7-0-excellence-unlocking/dp/183546047X/ref=sr_1_5?crid=2HFWED7YDF0CF&keywords=Mastering+MongoDB&qid=1695619744&sprefix=mastering+mongodb%2Caps%2C534&sr=8-5',
            packtLink:
                'https://www.packtpub.com/product/mastering-mongodb-70-fourth-edition/9781835460474',
            thumbnail:
                'https://images.contentstack.io/v3/assets/blt39790b633ee0d5a7/blt8e2b06ad27e0597e/650dcfabb16d6d1818552a37/Mastering_MongoDB_Final_Version.png',
        },
    ];

    const relatedBooks: Book[] = [
        {
            title: 'MongoDB Data Modeling and Schema Design',
            authors: ['Daniel Coupal', 'Pascal Desmarets', 'Steve Hoberman'],
            amazonLink: 'https://www.amazon.com/dp/1634621980',
            thumbnail:
                'https://images.contentstack.io/v3/assets/blt39790b633ee0d5a7/blt34bc146c27b13cc2/65036a00b863d952ffa79907/MongoDB_Data_Modeling_and_Schema_Design.jpg',
        },
        {
            title: 'MongoDB: The Definitive Guide: Powerful and Scalable Data Storage',
            authors: ['Shannon Bradshaw', 'Eoin Brazil', 'Kristina Chodorow'],
            amazonLink: 'https://www.amazon.com/dp/1491954469',
            thumbnail:
                'https://images.contentstack.io/v3/assets/blt39790b633ee0d5a7/blt0ce3def03da40905/65036a00b8c6d65c860e6865/MongoDB_The_Definitive_Guide.jpg',
        },
        {
            title: 'Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
            authors: ['Martin Kleppmann'],
            amazonLink:
                'https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321',
            thumbnail:
                'https://images.contentstack.io/v3/assets/blt39790b633ee0d5a7/bltd0e9834d24bca424/65036a001709f54ca7bf5974/Designing_Data-Intensive_Applications.jpg',
        },
        {
            title: 'The Little Mongo DB Schema Design Book',
            authors: ['Christian Kvalheim'],
            amazonLink:
                'https://www.amazon.com/Little-Mongo-Schema-Design-Book-ebook/dp/B016F2HQDA',
            thumbnail:
                'https://images.contentstack.io/v3/assets/blt39790b633ee0d5a7/bltd2711ee523a86a5b/65036a00ce38f436c4f4c87e/Little_Book_of_MongoDB_Schema_Design.jpg',
        },
    ];

    return {
        props: { featuredBooks, relatedBooks },
    };
};
