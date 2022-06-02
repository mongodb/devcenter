import { useEffect, useState } from 'react';

import { Author } from '../../interfaces/author';

import { circleStyles } from './styles';
import CopyLink from './copy-link';

interface SocialButtonsProps {
    heading: string;
    description: string;
    className?: string;
    authors?: Author[];
    language?: string;
}

const SocialButtons: React.FunctionComponent<SocialButtonsProps> = ({
    heading,
    description,
    className,
    authors,
    language,
}) => {
    console.log(authors);
    const [url, setUrl] = useState('');
    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const twitterTextElements: string[] = [];

    if (authors) {
        const authorTags = authors
            .filter(
                ({ twitter }) =>
                    twitter && !twitter.toLowerCase().endsWith('/mongodb')
            )
            .map(({ twitter }) => {
                const splitUrl = twitter?.split('/') as string[];
                const username = splitUrl[splitUrl?.length - 1];
                return `@${username}`;
            })
            .join(' ');
        twitterTextElements.push(authorTags);
    }
    if (language) {
        let languageTag: string;
        if (language === 'C++') {
            languageTag = 'cplusplus';
        } else if (language === 'C#') {
            languageTag = 'csharp';
        } else {
            languageTag = language.toLowerCase().replace(' ', '_');
        }
        twitterTextElements.push(languageTag);
    }

    twitterTextElements.push(heading);
    console.log(twitterTextElements);

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
                href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                    twitterTextElements.join(' ')
                )}`}
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
