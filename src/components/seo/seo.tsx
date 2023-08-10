import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { getCanonicalUrl } from '../../utils/seo';
import { ContentItem } from '../../interfaces/content-item';

export interface SEOprops {
    contentItem: ContentItem;
    isPathFactory: boolean | undefined;
    publicRuntimeConfig: any;
    asPath: string;
}

const Seo = ({
    contentItem: {
        title,
        seo,
        category,
        contentDate,
        updateDate,
        description,
        image,
        authors = [],
    },
    isPathFactory,
    publicRuntimeConfig,
    asPath,
}: SEOprops) => {
    console.log('CHECKING');
    const ogType =
        seo?.og_type ||
        ['Article', 'Code Example', 'Quickstart', 'Tutorial'].includes(category)
            ? 'article'
            : category === 'Video'
            ? 'video:other'
            : undefined;

    return (
        <>
            <Head>
                <meta
                    name="author"
                    content={authors.map(({ name }) => name).join(', ')}
                />
            </Head>
            <NextSeo
                title={`${title} | MongoDB`}
                twitter={{
                    site: seo?.twitter_site,
                    handle: seo?.twitter_creator,
                    cardType: seo?.twitter_card,
                }}
                openGraph={{
                    url: seo?.og_url,
                    title: seo?.og_title,
                    type: ogType,
                    description: seo?.og_description ?? description,
                    images: seo?.og_image?.url
                        ? [{ url: seo?.og_image?.url }]
                        : [{ url: image?.url ?? '' }],
                    article: {
                        publishedTime: Array.isArray(contentDate)
                            ? undefined
                            : contentDate,
                        modifiedTime: updateDate,
                        authors: authors.map(
                            ({ calculated_slug }) =>
                                publicRuntimeConfig.absoluteBasePath +
                                calculated_slug
                        ),
                    },
                }}
                description={
                    seo?.meta_description ||
                    description ||
                    publicRuntimeConfig.pageDescriptions['/']
                }
                canonical={
                    seo?.canonical_url ||
                    getCanonicalUrl(
                        publicRuntimeConfig.absoluteBasePath,
                        asPath
                    )
                }
                noindex={isPathFactory}
            />
        </>
    );
};

export default Seo;
