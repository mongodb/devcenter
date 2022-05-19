import React from 'react';

import { TypographyScale, GridLayout } from '@mdb/flora';

import Breadcrumbs from '../breadcrumbs';
import { HeroProps } from './types';
import { heroContainerStyles, CTAContainerStyles } from './styles';

const Hero: React.FunctionComponent<HeroProps> = ({
    crumbs,
    name,
    description,
    ctas,
}) => {
    return (
        <div sx={heroContainerStyles}>
            <GridLayout sx={{ rowGap: 'inc30' }}>
                {crumbs && <Breadcrumbs crumbs={crumbs} />}
                <div sx={{ gridColumn: ['span 6', null, 'span 5'] }}>
                    <TypographyScale
                        customElement="h1"
                        variant="heading2"
                        color="mark"
                        sx={{ marginBottom: ['inc20', null, null, 'inc40'] }}
                    >
                        {name}
                    </TypographyScale>
                    {!!description && (
                        <TypographyScale variant="body2">
                            {description}
                        </TypographyScale>
                    )}
                </div>
                {ctas}
            </GridLayout>
        </div>
    );
};

export default Hero;
