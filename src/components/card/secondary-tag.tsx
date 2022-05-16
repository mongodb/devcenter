import theme from '@mdb/flora/theme';

import { FullApplication, Snippet } from '../icons';
import { CodeLevel } from '../../types/tag-type';

const SecondaryTag: React.FunctionComponent<{ codeLevel: CodeLevel }> = ({
    codeLevel,
}) => {
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
            {codeLevel === 'Snippet' ? (
                <Snippet
                    sx={{
                        strokeWidth: 2,
                        stroke: theme.colors.text.secondary,
                    }}
                />
            ) : (
                <FullApplication
                    sx={{ strokeWidth: 2, fill: theme.colors.text.secondary }}
                />
            )}
            <span
                sx={{
                    lineHeight: 'inc00',
                    fontSize: 'inc00',
                    fontWeight: '500',
                }}
            >
                {codeLevel.toUpperCase()}
            </span>
        </div>
    );
};

export default SecondaryTag;
