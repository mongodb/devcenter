import { useEffect, useState } from 'react';

import { Author } from '../../interfaces/author';

import { circleStyles } from './styles';
import CopyLink from './copy-link';
import { Tag } from '../../interfaces/tag';

import { getTweetText } from './utils';

interface SocialButtonsProps {
    heading: string;
    description: string;
    className?: string;
    authors?: Author[];
    tags?: Tag[];
}

const SocialButtons: React.FunctionComponent<SocialButtonsProps> = ({
    heading,
    description,
    className,
    authors = [],
    tags = [],
}) => {
    const [url, setUrl] = useState('');
    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const tweetText = getTweetText(authors, heading, tags);

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
                href={`https://twitter.com/intent/tweet?url=${url}&text=${tweetText}`}
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
