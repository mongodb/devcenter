import Image from 'next/image';
import { useState } from 'react';

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
                        title="Copy Link"
                        onClick={onCopyLinkClick}
                    >
                        <Image
                            src="/developer/link.svg"
                            alt="Copy Link"
                            width={12}
                            height={12}
                        />
                    </button>
                    {showTooltip && (
                        <div sx={styles.tooltipWrapper}>
                            <div sx={styles.tooltipArrow} />
                            <div sx={styles.tooltipBody}>Link Copied!</div>
                        </div>
                    )}
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
                    />
                </a>
            )}
        </div>
    );
};

export default SocialButtons;
