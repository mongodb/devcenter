import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import {
    TypographyScale,
    FlashCard,
    GridLayout,
    ImageryType,
    CTAType,
    SystemIcon,
    ESystemIconNames,
} from '@mdb/flora';
import { Grid } from 'theme-ui';

import Link from 'next/link';
import { productToLogo } from '../utils/product-to-logo';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { MetaInfo } from '../interfaces/meta-info';
import { getURLPath } from '../utils/format-url-path';
import { h4Styles, h5Styles } from '../styled/layout';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

const featuredConfig = (prod: L1Product) => {
    const iconName = productToLogo[prod.tagName];
    return {
        iconConfig: {
            name: iconName,
        },
        cta: {
            type: 'link-arrow' as CTAType,
            text: 'Explore Content',
            config: {
                href: getURLPath(prod.slug),
                linkIconDisableExpand: true, // Doesn't seem to work
            },
        },
        flashCard: true,
        imageryType: (iconName ? 'icon' : 'none') as ImageryType,
        title: prod.tagName,
        text: prod.description,
    };
};

const flashCardStyles = {
    div: { minHeight: 'unset' },
    py: 'inc60',
};
interface L1Product {
    tagName: string;
    slug: string;
    description: string;
    l2s: MetaInfo[];
}
interface ProductsPageProps {
    products: L1Product[];
    featured: L1Product[];
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
    tagName,
    slug,
    description,
    l2s,
}) => {
    return (
        <div sx={{ marginBottom: l2s.length ? 'inc70' : 0 }}>
            <L1Link name={tagName} slug={slug} />
            {l2s.length ? (
                <Grid columns={[1, null, 2, 4]} gap="inc70">
                    {l2s.map(l2 => {
                        const iconName = productToLogo[l2.tagName];
                        const flashCardProps = {
                            iconConfig: {
                                name: iconName,
                            },
                            cta: {
                                type: 'link-arrow' as CTAType,
                                text: 'Learn More',
                                config: {
                                    href: getURLPath(l2.slug),
                                    linkIconDisableExpand: true, // Doesn't seem to work
                                },
                            },
                            flashCard: true,
                            imageryType: (iconName
                                ? 'icon'
                                : 'none') as ImageryType,
                            title: l2.tagName,
                            text: l2.description,
                            background: false,
                            alignment: 'left' as 'left',
                        };
                        return (
                            <FlashCard
                                key={l2.slug}
                                {...flashCardProps}
                                sx={{
                                    div: { minHeight: 'unset' },
                                    padding: 0,
                                }}
                            />
                        );
                    })}
                </Grid>
            ) : (
                <TypographyScale variant="body2">{description}</TypographyScale>
            )}
        </div>
    );
};
const ProductsPage: NextPage<ProductsPageProps> = ({ products, featured }) => (
    <>
        <NextSeo title={'All Products | MongoDB'} />
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
                        variant="heading2"
                        sx={{ ...h5Styles, marginBottom: 'inc40' }}
                    >
                        Featured Products
                    </TypographyScale>
                    <Grid
                        columns={[1, null, 2, 4]}
                        gap={['inc50', null, null, 'inc40']}
                    >
                        {featured.map(prod => (
                            <FlashCard
                                key={prod.slug}
                                sx={flashCardStyles}
                                {...featuredConfig(prod)}
                            />
                        ))}
                    </Grid>
                </div>
                <div sx={{ gridColumn: ['span 6', null, 'span 8', 'span 12'] }}>
                    <TypographyScale
                        variant="heading2"
                        sx={{
                            ...h4Styles,
                            marginBottom: 'inc90',
                            width: 'max-content',
                        }}
                    >
                        All Products
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
    const tags = await getAllMetaInfo();

    const l1Products = tags.filter(tag => tag.category === 'L1Product');
    const l2Products = tags.filter(tag => tag.category === 'L2Product');

    const products: L1Product[] = l1Products.map(prod => ({
        ...prod,
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
            throw Error('Did not find corresponding l1 for ' + l2.tagName);
        }
    });

    const atlas = products.filter(({ slug }) => slug === '/products/atlas')[0];
    const mongodb = products.filter(
        ({ slug }) => slug === '/products/mongodb'
    )[0];
    const realm = products.filter(({ slug }) => slug === '/products/realm')[0];
    const search = atlas.l2s.filter(
        ({ slug }) => slug === '/products/atlas/search'
    )[0];
    const featured = [atlas, mongodb, realm, search].filter(prod => !!prod);

    return {
        props: { products, featured },
    };
};
