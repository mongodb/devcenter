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

const getVideoUrl = (provider: string, videoId: string) => {
    if (!videoId) return undefined;
    switch (provider) {
        case 'twitch':
            return `https://www.twitch.tv/videos/${videoId}`;
        case 'youtube':
            return `https://www.youtube.com/watch?v=${videoId}`;
        default:
            return undefined;
    }
};

type Argument = {
    [k: string]: string;
};

export const VideoEmbed = ({
    argument,
    name: provider,
    thumbnail,
    ...props
}: {
    argument: Argument[];
    name: string;
    thumbnail: string;
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
                            video: videoId,
                        },
                    },
                }}
                controls
                light={thumbnail}
                url={value}
                width="100%"
                height="100%"
            />
        </div>
    );
};
