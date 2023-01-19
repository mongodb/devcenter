import React, { memo, useState } from 'react';

import {
    TypographyScale,
    GridLayout,
    Link,
    SystemIcon,
    ESystemIconNames,
} from '@mdb/flora';

import Breadcrumbs from '../breadcrumbs';
import { HeroProps } from './types';
import { heroContainerStyles, tooltipStyles } from './styles';

const Hero: React.FunctionComponent<HeroProps> = memo(
    ({ crumbs, name, description, ctas, topicPage }) => {
        const [showHoverTooltip, setShowHoverTooltip] = useState(false);
        const [showClickTooltip, setShowClickTooltip] = useState(false);

        // const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [isFollowing, setIsFollowing] = useState(false);

        let linkText = 'Follow';
        let tooltipText = 'You are no longer following this topic';
        if (isFollowing) {
            linkText = 'Unfollow';
            tooltipText = 'You are now following this topic';
        }

        const onFollowLinkClick = () => {
            setIsFollowing(!isFollowing);
            setShowHoverTooltip(false);
            setShowClickTooltip(true);
            setTimeout(() => setShowClickTooltip(false), 2000);
        };

        return (
            <div sx={heroContainerStyles}>
                <GridLayout sx={{ rowGap: 'inc30' }}>
                    {crumbs && <Breadcrumbs crumbs={crumbs} />}
                    <div sx={{ gridColumn: ['span 6', null, 'span 5'] }}>
                        <TypographyScale
                            customElement="h1"
                            variant="heading2"
                            color="mark"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                                display: 'flex',
                                flexDirection: 'row',
                                alignContent: 'space-around',
                                // alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            {name}
                            {topicPage && (
                                <>
                                    <Link
                                        onClick={onFollowLinkClick}
                                        onMouseEnter={() =>
                                            setShowHoverTooltip(true)
                                        }
                                        onMouseLeave={() =>
                                            setShowHoverTooltip(false)
                                        }
                                    >
                                        {!isFollowing && (
                                            <SystemIcon
                                                sx={{
                                                    fill: 'blue60',
                                                    stroke: 'blue60',
                                                }}
                                                name={ESystemIconNames.PLUS}
                                            />
                                        )}
                                        &nbsp;{linkText}
                                    </Link>
                                    <div
                                        sx={{
                                            position: 'relative',
                                            top: '50%',
                                            left: 100,
                                            transform: 'translate(-50%)',
                                        }}
                                    >
                                        {showClickTooltip && (
                                            <div
                                                sx={
                                                    tooltipStyles.tooltipWrapper
                                                }
                                            >
                                                <div
                                                    sx={
                                                        tooltipStyles.tooltipArrow
                                                    }
                                                />
                                                <div
                                                    sx={
                                                        tooltipStyles.tooltipBody
                                                    }
                                                >
                                                    {tooltipText}
                                                </div>
                                            </div>
                                        )}
                                        {showHoverTooltip && !isFollowing && (
                                            <div
                                                sx={
                                                    tooltipStyles.tooltipWrapper
                                                }
                                            >
                                                <div
                                                    sx={
                                                        tooltipStyles.tooltipArrow
                                                    }
                                                />
                                                <div
                                                    sx={
                                                        tooltipStyles.tooltipBody
                                                    }
                                                >
                                                    Receive a monthly digest and
                                                    recommended content based on
                                                    topics you follow!
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
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
    }
);

Hero.displayName = 'Hero';

export default Hero;
