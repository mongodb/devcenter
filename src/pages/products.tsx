import { NextPage, GetStaticProps } from 'next';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import {
    TypographyScale,
    FlashCard,
    GridLayout,
    ESingleImageVariant,
    ImageryType,
    CTAType,
    SystemIcon,
    ESystemIconNames,
} from '@mdb/flora';
import { Grid } from 'theme-ui';

import { getDistinctTags } from '../service/get-distinct-tags';
import { Tag } from '../interfaces/tag';
import Link from 'next/link';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

const atlasFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/kykgzd0sd3qiv9n36-atlas-hero.svg?ixlib=js-3.5.1&auto=format%2Ccompress&w=3038',
        variant: ESingleImageVariant.LETTERBOX,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Explore Content',
        config: { href: '/developer/products/atlas' },
    },
    imageryType: 'image' as ImageryType,
    title: 'Atlas',
    text: 'The multi-cloud application data platform.',
};
const mongodbFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/kv15ttga69clkiw6z-Homepage_Hero.svg?ixlib=js-3.5.1&auto=format%2Ccompress&w=3038',
        variant: ESingleImageVariant.LETTERBOX,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Explore Content',
        config: { href: '/developer/products/mongodb' },
    },
    imageryType: 'image' as ImageryType,
    title: 'MongoDB',
    text: 'The leading modern database with the data model developers love.',
};

const realmFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/kykfz1q9c4ynklfrg-realm-hero.svg?ixlib=js-3.5.1&auto=format%2Ccompress&w=3038',
        variant: ESingleImageVariant.LETTERBOX,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Explore Content',
        config: { href: '/developer/products/realm' },
    },
    imageryType: 'image' as ImageryType,
    title: 'Realm (Mobile)',
    text: 'Build, deploy, and scale mobile applications with ease.',
};

const searchFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/ktxaqsnnbqbx3o876-search_Slalom2.svg?ixlib=js-3.5.1&auto=format%2Ccompress&w=1075',
        variant: ESingleImageVariant.LETTERBOX,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Explore Content',
        config: {
            href: '/developer/products/search',
            linkIconDisableExpand: true,
        },
    },
    imageryType: 'image' as ImageryType,
    title: 'Search',
    text: 'Advanced search capabilities, built for MongoDB. ',
};

const flashCardStyles = {
    boxSizing: 'border-box' as 'border-box',
    div: { minHeight: 'unset' },
    py: 'inc60',
};
interface L1Product {
    name: string;
    slug: string;
    l2s: Tag[];
}
interface ProductsPageProps {
    products: L1Product[];
}

interface L1LinkProps {
    name: string;
    slug: string;
}
const L1Link: React.FunctionComponent<L1LinkProps> = ({ name, slug }) => (
    <Link href={slug} passHref key={slug}>
        <a
            sx={{
                '&:hover': {
                    '*': {
                        color: 'green60',
                        stroke: 'green60',
                    },
                },
                display: 'block',
                width: 'max-content',
                marginBottom: 'inc50',
            }}
        >
            <TypographyScale
                sx={{
                    display: 'inline-block',
                    marginRight: 'inc40',
                }}
                variant="heading5"
            >
                {name}
            </TypographyScale>
            <SystemIcon name={ESystemIconNames.CHEVRON_RIGHT} size="medium" />
        </a>
    </Link>
);

const ProductSection: React.FunctionComponent<L1Product> = ({
    name,
    slug,
    l2s,
}) => {
    return (
        <div sx={{ marginBottom: l2s.length ? 'inc70' : 0 }}>
            <L1Link name={name} slug={slug} />
            {l2s.length && (
                <Grid columns={[1, null, 2, 4]} gap="inc70">
                    {l2s.map(l2 => {
                        const flashCardProps = {
                            imageConfig: {
                                src: 'https://webimages.mongodb.com/_com_assets/cms/ktxaqsnnbqbx3o876-search_Slalom2.svg?ixlib=js-3.5.1&auto=format%2Ccompress&w=1075',
                                variant: ESingleImageVariant.LETTERBOX,
                            },
                            cta: {
                                type: 'link-arrow' as CTAType,
                                text: 'Explore Content',
                                config: {
                                    href: '/developer/products/search',
                                    linkIconDisableExpand: true,
                                },
                            },
                            imageryType: 'image' as ImageryType,
                            title: 'Search',
                            text: 'Advanced search capabilities, built for MongoDB. ',
                        };
                        return (
                            <FlashCard
                                key={l2.slug}
                                {...flashCardProps}
                                sx={{
                                    boxSizing: 'border-box' as 'border-box',
                                    div: { minHeight: 'unset' },
                                }}
                            />
                        );
                    })}
                </Grid>
            )}
        </div>
    );
};
const ProductsPage: NextPage<ProductsPageProps> = ({ products }) => (
    <>
        <Hero crumbs={crumbs} name="All Products" />
        <div
            sx={{
                paddingBottom: 'inc160',
                px: ['inc40', null, 'inc50', 'inc70'],
                paddingTop: ['inc40', null, 'inc50', 'inc70'],
            }}
        >
            <GridLayout>
                <div
                    sx={{
                        gridColumn: ['span 6', null, 'span 8', 'span 12'],
                        marginBottom: ['section40', null, null, 'section50'],
                    }}
                >
                    <TypographyScale
                        variant="heading5"
                        sx={{ marginBottom: 'inc40' }}
                    >
                        Featured Topics
                    </TypographyScale>
                    <Grid
                        columns={[1, null, 2, 4]}
                        gap={['inc50', null, null, 'inc40']}
                    >
                        <FlashCard
                            sx={flashCardStyles}
                            {...atlasFeaturedConfig}
                        />
                        <FlashCard
                            sx={flashCardStyles}
                            {...mongodbFeaturedConfig}
                        />
                        <FlashCard
                            sx={flashCardStyles}
                            {...realmFeaturedConfig}
                        />
                        <FlashCard
                            sx={flashCardStyles}
                            {...searchFeaturedConfig}
                        />
                    </Grid>
                </div>
                <div sx={{ gridColumn: ['span 6', null, 'span 8', 'span 12'] }}>
                    <TypographyScale
                        variant="heading4"
                        sx={{ marginBottom: 'inc90', width: 'max-content' }}
                    >
                        All Topics
                    </TypographyScale>
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'inc70',
                        }}
                    >
                        {products.map(product => (
                            <ProductSection {...product} key={product.slug} />
                        ))}
                    </div>
                </div>
            </GridLayout>
        </div>
    </>
);

export default ProductsPage;

export const getStaticProps: GetStaticProps = async () => {
    const distinctTags = await getDistinctTags();
    const l1Products = distinctTags.filter(tag => tag.type === 'L1Product');
    const l2Products = distinctTags.filter(tag => tag.type === 'L2Product');

    const products: L1Product[] = l1Products.map(({ type, ...rest }) => ({
        ...rest,
        l2s: [],
    }));
    l2Products.forEach(l2 => {
        const existingL1 = products.find(l1 => l2.slug.startsWith(l1.slug));
        if (existingL1) {
            if (
                !existingL1.l2s.find(existingL2 => existingL2.slug === l2.slug)
            ) {
                existingL1.l2s.push(l2);
            }
        } else {
            throw Error('Did not find corresponding l1 for ' + l2.name);
        }
    });

    console.log(products);

    return { props: { products } };
};
