import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { Link, SystemIcon, ESystemIconNames } from '@mdb/flora';
import { useSession } from 'next-auth/react';
import useSignInURL from '../../hooks/sign-in-url';
import { Tag } from '../../interfaces/tag';
import Tooltip from '../tooltip/tooltip';
import { useModalContext } from '../../contexts/modal';
import { ScrollPersonalizationModal } from '../modal/personalization';
import useUserPreferences from '../../hooks/personalization/user-preferences';
import { useNotificationContext } from '../../contexts/notification';
import { DEBOUNCE_WAIT } from '../../data/constants';

interface FollowLinkProps {
    topic: Tag;
    iconsOnly?: boolean;
}

const FollowLink: React.FunctionComponent<FollowLinkProps> = ({
    topic,
    iconsOnly = false,
}) => {
    const { updateUserPreferences } = useUserPreferences();
    const { setNotification } = useNotificationContext();
    const { status, data: session } = useSession();

    const followedTopics = session?.followedTags;
    const isFollowing = !!(
        followedTopics &&
        followedTopics.find(followedTopic => followedTopic.slug === topic.slug)
    );

    // Keep this state here because there is a delay that we cannot hook into in getting the updated session back.
    const [isShowingFollowing, setIsShowingFollowing] = useState(isFollowing);

    // Whenever the session updates propogate to here, update isShowingFollowing.
    useEffect(() => {
        setIsShowingFollowing(isFollowing);
    }, [setIsShowingFollowing, isFollowing, followedTopics]);

    const { openModal } = useModalContext();
    const signInURL = useSignInURL();
    const isLoggedIn = status === 'authenticated';
    const isFollowingAnyTopics = !!followedTopics && !!followedTopics.length;

    const hoverTooltipText = useMemo(() => {
        if (!isLoggedIn) return 'Sign in to follow topics';

        if (!isFollowingAnyTopics)
            return 'Receive a monthly digest and recommended content based on topics you follow!';

        if (iconsOnly)
            return isShowingFollowing
                ? 'Unfollow this topic'
                : 'Follow this topic';
    }, [isLoggedIn, isFollowingAnyTopics, iconsOnly, isShowingFollowing]);

    // If we're not in a hoverTooltipText scenario, there should be no hover tooltip rendered.
    const hasHoverTooltip = !!hoverTooltipText;

    const onFollowClick = useCallback(
        (currentlyFollowing: boolean) => {
            if (session?.failedToFetch) {
                setNotification({
                    message:
                        'Your request could not be completed at this time. Please try again.',
                    variant: 'WARN',
                });
                return;
            }
            let followedTags: Tag[];
            setIsShowingFollowing(!currentlyFollowing);
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
            updateUserPreferences({
                followedTags,
                emailPreference: session.emailPreference,
            });
        },
        [followedTopics, topic, session?.failedToFetch]
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
              onClick: () => debouncedOnFollowClick(isShowingFollowing), // Have to pass this in to prevent the debounced version from being overwritten on state change of isFollowing.
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
                    {(iconsOnly || !isShowingFollowing) && (
                        <SystemIcon
                            sx={{
                                fill: isShowingFollowing ? 'none' : 'blue60',
                                stroke: 'blue60',
                                path: {
                                    strokeWidth: isShowingFollowing ? 3 : 1,
                                },
                            }}
                            name={
                                isShowingFollowing
                                    ? ESystemIconNames.CHECK
                                    : ESystemIconNames.PLUS
                            }
                        />
                    )}
                    {!iconsOnly &&
                        (isShowingFollowing ? 'Unfollow' : ' Follow')}
                </Link>
            </div>
            <Tooltip className="tooltip">{hoverTooltipText}</Tooltip>
        </div>
    );
};

export default FollowLink;
