import React from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player/lazy';

const StyledReactPlayer = styled(ReactPlayer)`
    position: absolute;
    top: 0;
    left: 0;
    > div {
        /* Redefines stacking context, allowing play button animation to stick on top */
        position: sticky;
    }
`;

const getVideoUrl = (provider, videoId) => {
    if (!videoId) return null;
    switch (provider) {
        case 'twitch':
            return `https://www.twitch.tv/videos/${videoId}`;
        case 'youtube':
            return `https://www.youtube.com/watch?v=${videoId}`;
        default:
            return null;
    }
};

export const VideoEmbed = ({
    autoplay,
    argument,
    name: provider,
    thumbnail,
    ...props
}) => {
    const videoId = argument[0].value;
    const value = getVideoUrl(provider, videoId);
    return (
        <div sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <StyledReactPlayer
                config={{
                    youtube: {
                        playerVars: {
                            autohide: 1,
                            modestbranding: 1,
                            rel: 0,
                        },
                    },
                    twitch: {
                        options: {
                            autoplay,
                            video: videoId,
                        },
                    },
                }}
                controls
                light={thumbnail}
                playing
                url={value}
                width="100%"
                height="100%"
            />
        </div>
    );
};
