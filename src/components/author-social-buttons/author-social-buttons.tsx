import { useEffect, useState } from 'react';
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
    youtubeUrl,
    className,
}) => {
    const [url, setUrl] = useState('');
    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    return (
        <div
            aria-label="share-buttons-container"
            sx={{
                display: 'flex',
                gap: 'inc30',
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
                    <img
                        src="/developer/facebook.svg"
                        alt="facebook icon"
                        sx={{ width: '12px', height: '12px', display: 'block' }}
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
                    <img
                        src="/developer/twitter.svg"
                        alt="twitter icon"
                        sx={{ width: '12px', height: '12px', display: 'block' }}
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
                    <img
                        src="/developer/linkedin.svg"
                        alt="linkedin icon"
                        sx={{ width: '12px', height: '12px', display: 'block' }}
                    />
                </a>
            )}
            {/*
             TODO get youtube icon
*/}
            {/*{youtubeUrl && <a*/}
            {/*    sx={circleStyles}*/}
            {/*    href={youtubeUrl}*/}
            {/*    target="_blank"*/}
            {/*    rel="noreferrer"*/}
            {/*    title="Author's youtube Link"*/}
            {/*>*/}
            {/*    <img*/}
            {/*        src="/developer/facebook.svg"*/}
            {/*        alt="youtube icon"*/}
            {/*        sx={{ width: '12px', height: '12px', display: 'block' }}*/}
            {/*    />*/}
            {/*</a>}*/}
        </div>
    );
};

export default AuthorSocialButtons;
