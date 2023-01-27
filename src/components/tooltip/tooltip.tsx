import React from 'react';

import styles from './styles';

interface TooltipProps {
    children?: React.ReactNode;
    className?: string;
    alwaysBelow?: boolean;
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
    children,
    className,
    alwaysBelow = false,
}) => (
    <>
        <div sx={styles.tooltipArrow(alwaysBelow)} className={className} />
        <div sx={styles.tooltipBody(alwaysBelow)} className={className}>
            {children}
        </div>
    </>
);

export default Tooltip;
