import React, { useCallback, useMemo, useState } from 'react';

import { Link, SystemIcon, ESystemIconNames } from '@mdb/flora';
import { useSession } from 'next-auth/react';
import useSignInURL from '../../hooks/sign-in-url';
import { Tag } from '../../interfaces/tag';
import Tooltip from '../tooltip/tooltip';

interface Session {
    topics?: Tag[];
}

interface FollowLinkProps {
    topic: Tag;
    iconsOnly?: boolean;
}

const FollowLink: React.FunctionComponent<FollowLinkProps> = ({
    topic,
    iconsOnly = false,
}) => {
    const { status } = useSession();
    const [session, setSession] = useState<Session | null>({
        topics: [],
    });

    const [showClickTooltip, setShowClickTooltip] = useState(false);

    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null);

    const signInURL = useSignInURL();

    const isLoggedIn = status === 'authenticated';
    const followedTopics = session?.topics as Tag[] | undefined;
    const isFollowingAnyTopics = !!followedTopics && !!followedTopics.length;
    const isFollowing = useMemo(
        () =>
            !!(
                followedTopics &&
                followedTopics.find(
                    followedTopic => followedTopic.slug === topic.slug
                )
            ),
        [followedTopics, topic.slug]
    );

    const hoverTooltipText = useMemo(() => {
        if (!isLoggedIn) return 'Sign in to follow topics';

        if (!isFollowingAnyTopics)
            return 'Receive a monthly digest and recommended content based on topics you follow!';

        if (iconsOnly)
            return isFollowing ? 'Unfollow this topic' : 'Follow this topic';
    }, [isLoggedIn, isFollowingAnyTopics, iconsOnly, isFollowing]);

    // If we're not in a hoverTooltipText scenario, there should be no hover tooltip rendered.
    const hasHoverTooltip = !!hoverTooltipText;

    const onFollowClick = useCallback(() => {
        let topics: Tag[];
        // Never show the click tooltip when using the iconsOnly variant
        if (!isFollowingAnyTopics) {
            // TODO: Enter modal flow
            alert('Onboarding modal will go here');
            return;
        }
        if (!iconsOnly) {
            if (timeoutID) {
                // To prevent a follow and unfollow action in under 2 seconds from having it's click tooltip dissapear prematurely.
                clearTimeout(timeoutID);
            }
            setShowClickTooltip(true);
            const id = setTimeout(() => setShowClickTooltip(false), 2000);
            setTimeoutID(id);
        }

        if (followedTopics && isFollowing) {
            topics = followedTopics.filter(
                followedTopic => followedTopic.name !== topic.name
            );
        } else {
            topics = followedTopics ? [...followedTopics, topic] : [topic];
        }
        // TODO: POST these to external API endpoint.
        setSession({ topics });
    }, [isFollowing, followedTopics, topic]);

    const linkProps = isLoggedIn
        ? {
              onClick: onFollowClick,
          }
        : { href: signInURL };

    return (
        <div
            sx={{
                position: 'relative',
                '.tooltip': {
                    display: 'none',
                },
                '&:hover': {
                    '.tooltip': {
                        display: hasHoverTooltip ? 'initial' : 'hidden',
                    },
                },
            }}
        >
            <div>
                <Link {...linkProps}>
                    {(iconsOnly || !isFollowing) && (
                        <SystemIcon
                            sx={{
                                fill: isFollowing ? 'none' : 'blue60',
                                stroke: 'blue60',
                                path: { strokeWidth: isFollowing ? 3 : 1 },
                            }}
                            name={
                                isFollowing
                                    ? ESystemIconNames.CHECK
                                    : ESystemIconNames.PLUS
                            }
                        />
                    )}
                    {!iconsOnly && (isFollowing ? 'Unfollow' : ' Follow')}
                </Link>
            </div>
            <Tooltip className="tooltip">{hoverTooltipText}</Tooltip>
            {showClickTooltip && (
                <Tooltip>
                    You are {isFollowing ? 'now' : 'no longer'} following this
                    topic
                </Tooltip>
            )}
        </div>
    );
};

export default FollowLink;
