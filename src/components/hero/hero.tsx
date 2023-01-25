import React, { memo, useCallback, useMemo, useState } from 'react';

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
import { Tag } from '../../interfaces/tag';

interface TooltipProps {
    children?: React.ReactNode;
    className?: string;
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
    children,
    className,
}) => (
    <>
        <div sx={styles.tooltip.tooltipArrow} className={className} />
        <div sx={styles.tooltip.tooltipBody} className={className}>
            {children}
        </div>
    </>
);

interface Session {
    topics?: Tag[];
}

const Hero: React.FunctionComponent<HeroProps> = memo(
    ({ crumbs, name, description, ctas, topicPage }) => {
        const { status } = useSession();
        const [session, setSession] = useState<Session | null>(null);

        const [showClickTooltip, setShowClickTooltip] = useState(false);

        const isLoggedIn = status === 'authenticated';
        const followedTopics = session?.topics as Tag[] | undefined;
        const isFollowing = useMemo(
            () =>
                !!(
                    followedTopics &&
                    followedTopics.find(topic => topic.name === name)
                ),
            [followedTopics, name]
        );
        const hasHoverTooltip =
            !isLoggedIn || !followedTopics || !followedTopics.length;
        const signInURL = useSignInURL();

        const hoverTooltipText = isLoggedIn
            ? 'Receive a monthly digest and recommended content based on topics you follow!'
            : 'Sign in to follow topics';

        const onFollowClick = useCallback(() => {
            let topics: Tag[];
            if (followedTopics && isFollowing) {
                setShowClickTooltip(false); // Just in case they hit Follow and Unfollow in < 2 seconds.
                topics = followedTopics.filter(topic => topic.name !== name);
            } else {
                setShowClickTooltip(true);
                setTimeout(() => setShowClickTooltip(false), 2000);
                const newTopic: Tag = {
                    name,
                    type: 'Technology',
                    slug: '/',
                };
                topics = followedTopics
                    ? [...followedTopics, newTopic]
                    : [newTopic];
            }
            setSession({ topics });
        }, [isFollowing, followedTopics, name]);

        const linkElement: JSX.Element | null = useMemo(() => {
            if (!topicPage) return null;

            const linkProps = isLoggedIn
                ? {
                      onClick: onFollowClick,
                  }
                : { href: signInURL };
            return (
                <>
                    <div
                        sx={{
                            position: 'relative',
                            '.tooltip': {
                                display: 'none',
                            },
                            '&:hover': {
                                '.tooltip': {
                                    display: hasHoverTooltip
                                        ? 'initial'
                                        : 'hidden',
                                },
                            },
                        }}
                    >
                        <div>
                            <Link {...linkProps}>
                                {isFollowing ? (
                                    'Unfollow'
                                ) : (
                                    <>
                                        <SystemIcon
                                            sx={{
                                                fill: 'blue60',
                                                stroke: 'blue60',
                                            }}
                                            name={ESystemIconNames.PLUS}
                                        />
                                        Follow
                                    </>
                                )}
                            </Link>
                        </div>
                        <Tooltip className="tooltip">
                            {hoverTooltipText}
                        </Tooltip>
                        {showClickTooltip && (
                            <Tooltip>You are now following this topic</Tooltip>
                        )}
                    </div>
                </>
            );
        }, [
            topicPage,
            isLoggedIn,
            onFollowClick,
            isFollowing,
            signInURL,
            hasHoverTooltip,
            hoverTooltipText,
            showClickTooltip,
        ]);

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
                            {topicPage && linkElement}
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
