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

const CopyLink: React.FunctionComponent<{ url: string }> = ({ url }) => {
    // A lot of the styling is taken from Flora's Tooltip, but Flora hard-codes the on hover functionality to their Tooltip.
    const [tooltipShown, setToolTipShown] = useState(false);
    return (
        <div sx={{ ...circleStyles, position: 'relative' }}>
            <a
                onClick={() => {
                    navigator.clipboard.writeText(url);
                    setToolTipShown(true);
                    setTimeout(() => setToolTipShown(false), 2000);
                }}
                title="Copy link"
            >
                <img
                    src="/developer/link.svg"
                    alt="Copy Link"
                    sx={{ width: '12px', height: '12px', display: 'block' }}
                />
            </a>
            {tooltipShown && (
                <div
                    sx={{
                        zIndex: 999,
                        position: 'absolute',
                        top: 28,
                        bottom: 0,
                        left: -4,
                        right: 0,
                    }}
                >
                    <div
                        sx={{
                            width: 0,
                            height: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            marginLeft: 'base',
                            borderBottom: `8px solid ${theme.colors.background.containerInverse}`,
                        }}
                    />
                    <div
                        sx={{
                            bg: 'background.containerInverse',
                            color: 'text.inverse',
                            borderRadius: 'tooltips',
                            padding: ['inc10', null, null, 'inc20'],
                            textAlign: 'left',
                            fontSize: ['inc00', null, null, 'inc10'],
                            lineHeight: ['inc10', null, null, 'inc20'],
                            fontFamily: 'body',
                            width: 'max-content',
                            boxShadow: 'level01',
                        }}
                    >
                        Link Copied!
                    </div>
                </div>
            )}
        </div>
    );
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
            <CopyLink url={url} />
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
