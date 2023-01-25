import React from 'react';

import styles from './styles';

interface TooltipProps {
    children?: React.ReactNode;
    className?: string;
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
    children,
    className,
}) => (
    <>
        <div sx={styles.tooltipArrow} className={className} />
        <div sx={styles.tooltipBody} className={className}>
            {children}
        </div>
    </>
);

export default Tooltip;
