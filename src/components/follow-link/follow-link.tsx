import React, { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { Link, SystemIcon, ESystemIconNames } from '@mdb/flora';
import { useSession } from 'next-auth/react';
import useSignInURL from '../../hooks/sign-in-url';
import { Tag } from '../../interfaces/tag';
import Tooltip from '../tooltip/tooltip';
import { useModalContext } from '../../contexts/modal';
import { ScrollPersonalizationModal } from '../modal/personalization';
import { submitPersonalizationSelections } from '../modal/personalization/utils';
import { DEBOUNCE_WAIT } from '../../data/constants';

interface FollowLinkProps {
    topic: Tag;
    iconsOnly?: boolean;
}

const FollowLink: React.FunctionComponent<FollowLinkProps> = ({
    topic,
    iconsOnly = false,
}) => {
    const { status, data: session } = useSession();

    const [showClickTooltip, setShowClickTooltip] = useState(false);

    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null);

    const followedTopics = session?.followedTags;

    // Keep this state here because there is a delay that we cannot hook into in getting the updated session back.
    const [isFollowing, setIsFollowing] = useState(
        !!(
            followedTopics &&
            followedTopics.find(
                followedTopic => followedTopic.slug === topic.slug
            )
        )
    );

    const { openModal } = useModalContext();
    const signInURL = useSignInURL();
    const isLoggedIn = status === 'authenticated';
    const isFollowingAnyTopics = !!followedTopics && !!followedTopics.length;

    const hoverTooltipText = useMemo(() => {
        if (!isLoggedIn) return 'Sign in to follow topics';

        if (!isFollowingAnyTopics)
            return 'Receive a monthly digest and recommended content based on topics you follow!';

        if (iconsOnly)
            return isFollowing ? 'Unfollow this topic' : 'Follow this topic';
    }, [isLoggedIn, isFollowingAnyTopics, iconsOnly, isFollowing]);

    // If we're not in a hoverTooltipText scenario, there should be no hover tooltip rendered.
    const hasHoverTooltip = !!hoverTooltipText;

    const onFollowClick = useCallback(
        (currentlyFollowing: boolean) => {
            let followedTags: Tag[];
            // Never show the click tooltip when using the iconsOnly variant
            if (!isFollowingAnyTopics) {
                openModal(
                    <ScrollPersonalizationModal
                        title={
                            <>
                                You&apos;re now following this topic. <br />{' '}
                                Interested in following other topics?
                            </>
                        }
                        existingSelections={[topic]}
                    />,
                    { hideCloseBtn: true }
                );
                return;
            }

            if (followedTopics && currentlyFollowing) {
                followedTags = followedTopics.filter(
                    followedTopic => followedTopic.name !== topic.name
                );
            } else {
                followedTags = followedTopics
                    ? [...followedTopics, topic]
                    : [topic];
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
            setIsFollowing(!currentlyFollowing);
            submitPersonalizationSelections({
                followedTags,
                emailPreference: session.emailPreference,
            });
        },
        [followedTopics, topic]
    );

    const debouncedOnFollowClick = useMemo(
        () =>
            debounce(onFollowClick, DEBOUNCE_WAIT, {
                leading: true,
                trailing: false,
            }),
        [onFollowClick]
    );

    const linkProps = isLoggedIn
        ? {
              onClick: () => debouncedOnFollowClick(isFollowing), // Have to pass this in to prevent the debounced version from being overwritten on state change of isFollowing.
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
                        display: hasHoverTooltip ? 'initial' : 'none',
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
