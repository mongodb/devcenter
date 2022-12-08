import { useEffect, useState } from 'react';
import Image from 'next/image';
import theme from '@mdb/flora/theme';
interface SocialButtonsProps {
    facebookUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    youtubeUrl?: string;
    className?: string;
}

const circleStyles = {
    borderRadius: 'circle',
    background: theme.colors.background.containerInverse,
    cursor: 'pointer',
    padding: '6px',
};

const AuthorSocialButtons: React.FunctionComponent<SocialButtonsProps> = ({
    facebookUrl,
    linkedinUrl,
    twitterUrl,
    className,
}) => {
    return (
        <div
            aria-label="share-buttons-container"
            sx={{
                display: 'flex',
                gap: 'inc30',
                height: 'fit-content',
                span: {
                    display: 'block !important;', // Override next/image default styling
                },
            }}
            className={className}
        >
            {facebookUrl && (
                <a
                    sx={circleStyles}
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Author's facebook Link"
                >
                    <Image
                        src="/developer/facebook.svg"
                        alt="facebook icon"
                        width={12}
                        height={12}
                    />
                </a>
            )}
            {twitterUrl && (
                <a
                    sx={circleStyles}
                    target="_blank"
                    rel="noreferrer"
                    href={twitterUrl}
                    title="Author's twitter Link"
                >
                    <Image
                        src="/developer/twitter.svg"
                        alt="twitter icon"
                        width={12}
                        height={12}
                    />
                </a>
            )}
            {linkedinUrl && (
                <a
                    sx={circleStyles}
                    target="_blank"
                    rel="noreferrer"
                    // The summary param should be description, we can do that once we figure the description field out.
                    href={linkedinUrl}
                    title="Author's linkedin Link"
                >
                    <Image
                        src="/developer/linkedin.svg"
                        alt="linkedin icon"
                        width={12}
                        height={12}
                    />
                </a>
            )}
        </div>
    );
};

export default AuthorSocialButtons;
