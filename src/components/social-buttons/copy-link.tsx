import { useState } from 'react';
import theme from '@mdb/flora/theme';

import { circleStyles } from './styles';

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

export default CopyLink;
