import { useState } from 'react';

import { TypographyScale, Link, BrandedIcon } from '@mdb/flora';
import { Grid } from 'theme-ui';
import ShowcaseCard from '../../components/showcase-card';
import { ShowcaseCardItem } from '../../components/showcase-card/types';

interface ProductsSectionProps {
    title: string;
    items: ShowcaseCardItem[];
}

const ProductsSection: React.FunctionComponent<ProductsSectionProps> = ({
    title,
    items,
}) => {
    const [itemsExpanded, setItemsExpanded] = useState(false);
    const itemsToDisplay = itemsExpanded ? undefined : 3;

    return (
        <div
            sx={{
                marginBottom: ['section20', null, null, 'section40'],
            }}
        >
            <TypographyScale variant="heading5" sx={{ marginBottom: 'inc40' }}>
                {title}
            </TypographyScale>

            <Grid
                columns={[3]}
                sx={{
                    gap: ['inc30', null, 'inc40'],
                    marginBottom: 'inc40',
                }}
            >
                {items
                    .slice(0, itemsToDisplay)
                    .map(({ titleLink, imageString, cta, links }) => {
                        const image = <BrandedIcon name={imageString} />;
                        return (
                            <ShowcaseCard
                                key={titleLink.text}
                                alignment="left"
                                image={image}
                                titleLink={titleLink}
                                cta={cta}
                                sx={{ width: '100%' }}
                                links={links}
                            />
                        );
                    })}
            </Grid>
            {items.length > 3 && (
                <Link
                    onClick={() => setItemsExpanded(!itemsExpanded)}
                    sx={{ display: 'block', mx: 'auto' }}
                >
                    {itemsExpanded ? 'Less' : 'More'} Products
                </Link>
            )}
        </div>
    );
};

export default ProductsSection;
