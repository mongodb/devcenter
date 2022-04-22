import { SystemIcon, TypographyScale, ESystemIconNames } from '@mdb/flora';
import theme from '@mdb/flora/theme';

const tagWrapper = {
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
        borderColor: 'black80',
        borderWidth: 'inc20',
        paddingBottom: `calc(${theme.space.inc20} - 2px)`,
        paddingRight: `calc(${theme.space.inc30} - 2px)`,
        right: '1px',
        bottom: '1px',
    },
    cursor: 'pointer',
};
import { FilterItem } from '../../components/filter-group';

interface FilterTagProps {
    filter: FilterItem;
    onClose: (filter: FilterItem) => void;
}

const FilterTag: React.FunctionComponent<FilterTagProps> = ({
    filter,
    onClose,
}) => {
    return (
        <div sx={tagWrapper} onClick={() => onClose(filter)}>
            <TypographyScale
                customStyles={{ lineHeight: 'inc00' }}
                variant="body3"
            >
                {filter.name}
            </TypographyScale>
            <div
                sx={{
                    svg: { width: '12px', height: '12px' },
                }}
            >
                <SystemIcon
                    name={ESystemIconNames.CLOSE}
                    strokeWeight="medium"
                />
            </div>
        </div>
    );
};

export default FilterTag;
