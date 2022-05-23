import { useState } from 'react';

import {
    TypographyScale,
    Link,
    ThirdPartyLogo,
    EThirdPartyLogoVariant,
} from '@mdb/flora';
import theme from '@mdb/flora/theme';
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
                columns={items.length}
                sx={{
                    display: ['grid', null, 'none'],
                    marginBottom: 'inc40',
                    marginTop: ['inc30', null, null, 'inc40'],
                    paddingBottom: ['inc30', null, '0'],
                    gap: ['inc40', null, null, 'inc40'],
                    overflow: ['auto', null, 'visible'],
                    mx: [`-${theme.space.inc40}`, null, 'unset'],
                    px: ['inc40', null, 'unset'],
                }}
            >
                {items.map(({ titleLink, imageString }) => {
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
                            sx={{
                                boxSizing: 'border-box' as 'border-box',
                                width: ['33vw', null, 'auto'],
                            }}
                            wholeCardHref={titleLink.url}
                        />
                    );
                })}
            </Grid>
            <div sx={{ display: ['none', null, 'block'] }}>
                <Grid
                    columns={4}
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
                                    variant={
                                        imageString as EThirdPartyLogoVariant
                                    }
                                />
                            ) : null;
                            return (
                                <ShowcaseCard
                                    key={titleLink.text}
                                    alignment="center"
                                    image={image}
                                    titleLink={titleLink}
                                    sx={{ width: '100%' }}
                                    wholeCardHref={titleLink.url}
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
        </div>
    );
};

export default LanguagesSection;
