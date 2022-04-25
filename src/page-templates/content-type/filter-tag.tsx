import { SystemIcon, TypographyScale, ESystemIconNames } from '@mdb/flora';
import theme from '@mdb/flora/theme';

const tagWrapper = {
    bg: 'black10',
    fontWeight: 'medium',
    fontSize: 'inc20',
    display: 'flex',
    gap: 'inc20',
    alignItems: 'center',
    borderStyle: 'solid',
    borderRadius: 'circle',
    borderColor: 'black30',
    borderWidth: 'inc10',
    px: 'inc30',
    py: 'inc20',
    position: 'relative' as 'relative',
    '&:hover': {
        bg: 'black20',
        borderColor: 'black80',
        borderWidth: 'inc20',
        paddingBottom: `calc(${theme.space.inc20} - 2px)`,
        paddingRight: `calc(${theme.space.inc30} - 2px)`,
        right: '1px',
        bottom: '1px',
    },
    cursor: 'pointer',
    height: '16px',
};
import { FilterItem } from '../../components/search-filters';

interface FilterTagProps {
    filter: FilterItem;
    onClick: (filter: FilterItem) => void;
    closeIcon?: boolean;
}

const FilterTag: React.FunctionComponent<FilterTagProps> = ({
    filter,
    onClick,
    closeIcon = false,
}) => {
    const handlerEnter = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onClick(filter);
        }
    };
    const handleClick = () => onClick(filter);

    return (
        <div
            sx={tagWrapper}
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={handlerEnter}
        >
            <TypographyScale
                customStyles={{ lineHeight: 'inc00' }}
                variant="body3"
            >
                {filter.name}
            </TypographyScale>
            {closeIcon && (
                <div
                    sx={{
                        svg: { width: '12px', height: '12px' },
                    }}
                >
                    <SystemIcon
                        name={ESystemIconNames.CLOSE}
                        size="small"
                        strokeWeight="medium"
                    />
                </div>
            )}
        </div>
    );
};

export default FilterTag;
