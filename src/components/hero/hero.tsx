import React, { memo } from 'react';

import { TypographyScale, GridLayout } from '@mdb/flora';

import Breadcrumbs from '../breadcrumbs';
import { HeroProps } from './types';
import { heroContainerStyles } from './styles';
import FollowLink from '../follow-link';

const Hero: React.FunctionComponent<HeroProps> = memo(
    ({ crumbs, name, description, ctas, topicPage }) => {
        return (
            <div sx={heroContainerStyles}>
                <GridLayout sx={{ rowGap: 'inc30' }}>
                    {crumbs && <Breadcrumbs crumbs={crumbs} />}
                    <div sx={{ gridColumn: ['span 6', null, 'span 5'] }}>
                        <div
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'inc30',
                            }}
                        >
                            <TypographyScale
                                customElement="h1"
                                variant="heading2"
                                color="mark"
                                // This styling is to accomodate the "Follow" button on topic pages.
                                sx={{
                                    width: topicPage
                                        ? 'min-content'
                                        : 'initial',
                                }}
                            >
                                {name}
                            </TypographyScale>
                            {topicPage && <FollowLink topicName={name} />}
                        </div>
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
    }
);

Hero.displayName = 'Hero';

export default Hero;
