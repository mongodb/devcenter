import { useEffect, useState } from 'react';
import theme from '@mdb/flora/theme';

interface SocialButtonsProps {
    heading: string;
    description: string;
    className?: string;
}

const circleStyles = {
    borderRadius: 'circle',
    background: theme.colors.background.containerInverse,
    cursor: 'pointer',
    padding: '6px',
};

const SocialButtons: React.FunctionComponent<SocialButtonsProps> = ({
    heading,
    description,
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
            <a
                sx={circleStyles}
                onClick={() => {
                    navigator.clipboard.writeText(url);
                }}
                title="Copy link"
            >
                <img
                    src="/developer/link.svg"
                    alt="Copy Link"
                    sx={{ width: '12px', height: '12px', display: 'block' }}
                />
            </a>
            <a
                sx={circleStyles}
                href={`https://www.facebook.com/sharer.php?u=${url}`}
                target="_blank"
                rel="noreferrer"
                title="Share on Facebook"
            >
                <img
                    src="/developer/facebook.svg"
                    alt="facebook icon"
                    sx={{ width: '12px', height: '12px', display: 'block' }}
                />
            </a>
            <a
                sx={circleStyles}
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?url=${url}&text=${heading}`}
                title="Share on Twitter"
            >
                <img
                    src="/developer/twitter.svg"
                    alt="twitter icon"
                    sx={{ width: '12px', height: '12px', display: 'block' }}
                />
            </a>
            <a
                sx={circleStyles}
                target="_blank"
                rel="noreferrer"
                // The summary param should be description, we can do that once we figure the description field out.
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${heading}&summary=${heading}&source=MongoDB`}
                title="Share on LinkedIn"
            >
                <img
                    src="/developer/linkedin.svg"
                    alt="linkedin icon"
                    sx={{ width: '12px', height: '12px', display: 'block' }}
                />
            </a>
        </div>
    );
};

export default SocialButtons;
