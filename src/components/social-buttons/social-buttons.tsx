import { useEffect, useState } from 'react';
import Image from 'next/image';

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
                span: {
                    display: 'block !important', // Override next/image default styling
                },
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
                <Image
                    src="/developer/facebook.svg"
                    alt="facebook icon"
                    width={12}
                    height={12}
                />
            </a>
            <a
                sx={circleStyles}
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?url=${url}&text=${tweetText}`}
                title="Share on Twitter"
            >
                <Image
                    src="/developer/twitter.svg"
                    alt="twitter icon"
                    width={12}
                    height={12}
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
                <Image
                    src="/developer/linkedin.svg"
                    alt="linkedin icon"
                    width={12}
                    height={12}
                />
            </a>
        </div>
    );
};

export default SocialButtons;
