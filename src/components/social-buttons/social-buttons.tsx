import Image from 'next/image';
import { useState } from 'react';
import Tooltip from '../tooltip';

import styles from './styles';

interface SocialMediaPlatform {
    url: string;
    title: string;
}

interface SocialButtonsProps {
    className?: string;
    copyUrl?: string;
    facebook?: SocialMediaPlatform;
    twitter?: SocialMediaPlatform;
    linkedIn?: SocialMediaPlatform;
}

const SocialButtons: React.FunctionComponent<SocialButtonsProps> = ({
    className,
    linkedIn,
    twitter,
    facebook,
    copyUrl = '',
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const onCopyLinkClick = () => {
        navigator.clipboard.writeText(copyUrl);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
    };

    return (
        <div
            aria-label="share-buttons-container"
            sx={styles.container}
            className={className}
        >
            {copyUrl && (
                <div sx={{ position: 'relative' }}>
                    <button
                        sx={{
                            ...styles.copyLinkBtn,
                            ...styles.circle,
                        }}
                        title="Copy link"
                        onClick={onCopyLinkClick}
                    >
                        <Image
                            src="/developer/link.svg"
                            alt="Copy link"
                            width={12}
                            height={12}
                            sx={{ display: 'block' }}
                        />
                    </button>
                    {showTooltip && <Tooltip alwaysBelow>Link Copied!</Tooltip>}
                </div>
            )}
            {facebook?.url && (
                <a
                    sx={styles.circle}
                    href={facebook.url}
                    target="_blank"
                    rel="noreferrer"
                    title={facebook.title}
                >
                    <Image
                        src="/developer/facebook.svg"
                        alt="Facebook Icon"
                        width={12}
                        height={12}
                        sx={{ display: 'block' }}
                    />
                </a>
            )}
            {twitter?.url && (
                <a
                    sx={styles.circle}
                    target="_blank"
                    rel="noreferrer"
                    href={twitter.url}
                    title={twitter.title}
                >
                    <Image
                        src="/developer/twitter.svg"
                        alt="twitter icon"
                        width={12}
                        height={12}
                        sx={{ display: 'block' }}
                    />
                </a>
            )}
            {linkedIn?.url && (
                <a
                    sx={styles.circle}
                    target="_blank"
                    rel="noreferrer"
                    href={linkedIn.url}
                    title={linkedIn.title}
                >
                    <Image
                        src="/developer/linkedin.svg"
                        alt="linkedin icon"
                        width={12}
                        height={12}
                        sx={{ display: 'block' }}
                    />
                </a>
            )}
        </div>
    );
};

export default SocialButtons;
