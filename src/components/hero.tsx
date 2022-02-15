import React from 'react';

import { TypographyScale, Button, Link } from '@mdb/flora';

import Breadcrumbs from './breadcrumbs';
import { HeroProps } from '../interfaces/components/hero';
import {
    HeroContainer,
    LeftContainer,
    Title,
    CTAContainer,
    HeroGrid,
} from '../styled/hero';

const Hero: React.FunctionComponent<HeroProps> = ({
    crumbs,
    name,
    description,
    ctas,
}) => {
    return (
        <HeroContainer>
            <HeroGrid>
                <Breadcrumbs crumbs={crumbs} />
                <LeftContainer>
                    <Title variant="heading2" color="mark">
                        {name}
                    </Title>
                    <TypographyScale variant="body2">
                        {description}
                    </TypographyScale>
                </LeftContainer>
                <CTAContainer>
                    {ctas.map((cta, i) => {
                        // Max of 2 buttons, so only bother with the first 2.
                        if (i === 0) {
                            return (
                                <Button
                                    key={cta.text}
                                    href={cta.url}
                                    variant={
                                        ctas.length > 1
                                            ? 'secondary'
                                            : 'primary'
                                    }
                                    size="large"
                                    target="_blank"
                                >
                                    {cta.text}
                                </Button>
                            );
                        }
                        if (i === 1) {
                            return (
                                <Link
                                    href={cta.url}
                                    key={cta.text}
                                    linkIcon="arrow"
                                    target="_blank"
                                >
                                    {cta.text}
                                </Link>
                            );
                        }
                    })}
                </CTAContainer>
            </HeroGrid>
        </HeroContainer>
    );
};

export default Hero;
