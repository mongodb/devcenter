import React from 'react';
import theme from '@mdb/flora/theme';

const SecondaryTag: React.FunctionComponent<{
    icon?: React.ReactNode;
    children: React.ReactNode;
}> = ({ icon = null, children }) => {
    return (
        <div
            sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.colors.text.secondary,
                gap: 'inc10',
                marginBottom: 'inc30',
            }}
        >
            {icon}
            <span
                sx={{
                    lineHeight: 'inc00',
                    fontSize: 'inc00',
                    fontWeight: '500',
                }}
            >
                {children}
            </span>
        </div>
    );
};

export default SecondaryTag;
