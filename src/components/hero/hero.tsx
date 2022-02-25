import React from 'react';

import { TypographyScale, Button, Link, GridLayout } from '@mdb/flora';

import Breadcrumbs from './breadcrumbs';
import { HeroProps } from '../../interfaces/components/hero';
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
                <Breadcrumbs crumbs={crumbs} />
                <div sx={{ gridColumn: ['span 6', null, 'span 5'] }}>
                    <TypographyScale
                        variant="heading2"
                        color="mark"
                        sx={{ marginBottom: ['inc20', null, null, 'inc40'] }}
                    >
                        {name}
                    </TypographyScale>
                    <TypographyScale variant="body2">
                        {description}
                    </TypographyScale>
                </div>
                <div sx={CTAContainerStyles}>
                    {ctas.length < 3
                        ? ctas.map((cta, i) => {
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
                                          target="_blank" // Flora doesn't add rel="noopener", so maybe we can contribute that.
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
                          })
                        : null}
                </div>
            </GridLayout>
        </div>
    );
};

export default Hero;
