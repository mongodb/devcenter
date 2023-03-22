import { Grid } from 'theme-ui';
import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import {
    TypographyScale,
    FlashCard,
    GridLayout,
    SystemIcon,
    ESystemIconNames,
} from '@mdb/flora';

import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';

import { getURLPath } from '../utils/format-url-path';
import { productToLogo } from '../utils/product-to-logo';

import allMetaInfoPreval from '../service/get-all-meta-info.preval';
import { MetaInfo } from '../interfaces/meta-info';

import { h4Styles, h5Styles } from '../styled/layout';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

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
    <a
        href={getURLPath(slug)}
        key={slug}
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
                        // Flash card needs to be updated in Flora. Currently it contains nested <a> tags, which is not legal HTML.
                        return (
                            <FlashCard
                                flashCard
                                key={l2.slug}
                                alignment="left"
                                background={false}
                                title={l2.tagName}
                                text={l2.description}
                                iconConfig={{ name: iconName }}
                                imageryType={iconName ? 'icon' : 'none'}
                                cta={{
                                    type: 'link-arrow',
                                    text: 'Learn More',
                                    config: {
                                        href: getURLPath(l2.slug),
                                        linkIconDisableExpand: true, // Doesn't seem to work
                                    },
                                }}
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
                        {featured.map(prod => {
                            const iconName = productToLogo[prod.tagName];
                            // Flash card needs to be updated in Flora. Currently it contains nested <a> tags, which is not legal HTML.
                            return (
                                <FlashCard
                                    flashCard
                                    key={prod.slug}
                                    title={prod.tagName}
                                    text={prod.description}
                                    iconConfig={{ name: iconName }}
                                    imageryType={iconName ? 'icon' : 'none'}
                                    cta={{
                                        type: 'link-arrow',
                                        text: 'Explore Content',
                                        config: {
                                            href: getURLPath(prod.slug),
                                            linkIconDisableExpand: true, // Doesn't seem to work
                                        },
                                    }}
                                    sx={{
                                        div: { minHeight: 'unset' },
                                        py: 'inc60',
                                    }}
                                />
                            );
                        })}
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
    const l1Products = allMetaInfoPreval.filter(
        tag => tag.category === 'L1Product'
    );
    const l2Products = allMetaInfoPreval.filter(
        tag => tag.category === 'L2Product'
    );

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
