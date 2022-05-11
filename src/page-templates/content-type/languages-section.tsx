import { useState } from 'react';

import {
    TypographyScale,
    Link,
    ThirdPartyLogo,
    EThirdPartyLogoVariant,
} from '@mdb/flora';
import { Grid } from 'theme-ui';
import ShowcaseCard from '../../components/showcase-card';
import { ShowcaseCardItem } from '../../components/showcase-card/types';

interface LanguagesSectionProps {
    title: string;
    items: ShowcaseCardItem[];
}

const LanguagesSection: React.FunctionComponent<LanguagesSectionProps> = ({
    title,
    items,
}) => {
    const [itemsExpanded, setItemsExpanded] = useState(false);
    const itemsToDisplay = itemsExpanded ? undefined : 4;
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
                columns={[4]}
                sx={{
                    gap: ['inc30', null, 'inc40'],
                    marginBottom: 'inc40',
                }}
            >
                {items
                    .slice(0, itemsToDisplay)
                    .map(({ titleLink, imageString }) => {
                        const image = imageString ? (
                            <ThirdPartyLogo
                                variant={imageString as EThirdPartyLogoVariant}
                            />
                        ) : null;
                        return (
                            <ShowcaseCard
                                key={titleLink.text}
                                alignment="center"
                                image={image}
                                titleLink={titleLink}
                                sx={{ width: '100%' }}
                            />
                        );
                    })}
            </Grid>
            {items.length > 4 && (
                <Link
                    onClick={() => setItemsExpanded(!itemsExpanded)}
                    sx={{ display: 'block', mx: 'auto' }}
                >
                    {itemsExpanded ? 'Less' : 'More'} languages
                </Link>
            )}
        </div>
    );
};

export default LanguagesSection;
