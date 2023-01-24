import React, { memo } from 'react';

import {
    TypographyScale,
    GridLayout,
    Link,
    SystemIcon,
    ESystemIconNames,
} from '@mdb/flora';
import { useSession } from 'next-auth/react';

import Breadcrumbs from '../breadcrumbs';
import { HeroProps } from './types';
import { heroContainerStyles } from './styles';
import styles from '../../page-templates/content-page/styles';
import useSignInURL from '../../hooks/sign-in-url';
// import { Tag } from '../../interfaces/tag';

interface TooltipProps {
    text: string;
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({ text }) => (
    <div sx={styles.tooltip.tooltipPlacement}>
        <div sx={styles.tooltip.tooltipWrapper}>
            <div sx={styles.tooltip.tooltipArrow} />
            <div sx={styles.tooltip.tooltipBody}>{text}</div>
        </div>
    </div>
);

const Hero: React.FunctionComponent<HeroProps> = memo(
    ({ crumbs, name, description, ctas, topicPage }) => {
        const { data: session } = useSession();

        console.log('SESSION:', session);

        // const [showHoverTooltip, setShowHoverTooltip] = useState(false);
        // const [showClickTooltip, setShowClickTooltip] = useState(false);

        const isLoggedIn = !!session;
        // const followedTopics = session?.topics as Tag[] | undefined;
        // const isFollowing = !!(
        //     followedTopics && followedTopics.find(topic => topic.name === name)
        // );
        const signInURL = useSignInURL();

        // let linkText = 'Follow';
        // let tooltipText = 'You are no longer following this topic';
        // if (isFollowing) {
        //     linkText = 'Unfollow';
        //     tooltipText = 'You are now following this topic';
        // }

        // const onFollowLinkClick = () => {
        //     setShowHoverTooltip(false);
        //     setShowClickTooltip(true);
        //     setTimeout(() => setShowClickTooltip(false), 2000);
        // };

        let linkElement: JSX.Element | null = null;
        if (topicPage) {
            if (!isLoggedIn) {
                linkElement = (
                    <>
                        <div>
                            <div
                                onMouseEnter={() => {
                                    // setShowHoverTooltip(true);
                                    console.log('Enter');
                                }}
                                onMouseLeave={() => {
                                    // setShowHoverTooltip(false);
                                    console.log('Leave');
                                }}
                            >
                                <Link href={signInURL}>
                                    <SystemIcon
                                        sx={{
                                            fill: 'blue60',
                                            stroke: 'blue60',
                                        }}
                                        name={ESystemIconNames.PLUS}
                                    />
                                    Follow
                                </Link>
                            </div>
                        </div>
                        {true && <Tooltip text="Rec" />}
                    </>
                );
            }
        }
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
                            >
                                {name}
                            </TypographyScale>
                            {topicPage && linkElement}
                        </div>
                        {/* {topicPage && (
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
                                    <div sx={styles.tooltip.tooltipPlacement}>
                                        {showClickTooltip && (
                                            <div
                                                sx={
                                                    styles.tooltip
                                                        .tooltipWrapper
                                                }
                                            >
                                                <div
                                                    sx={
                                                        styles.tooltip
                                                            .tooltipArrow
                                                    }
                                                />
                                                <div
                                                    sx={
                                                        styles.tooltip
                                                            .tooltipBody
                                                    }
                                                >
                                                    {tooltipText}
                                                </div>
                                            </div>
                                        )}
                                        {showHoverTooltip && !isFollowing && (
                                            <div
                                                sx={
                                                    styles.tooltip
                                                        .tooltipWrapper
                                                }
                                            >
                                                <div
                                                    sx={
                                                        styles.tooltip
                                                            .tooltipArrow
                                                    }
                                                />
                                                <div
                                                    sx={
                                                        styles.tooltip
                                                            .tooltipBody
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
                            )} */}

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
