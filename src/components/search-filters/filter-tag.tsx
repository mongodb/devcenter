import { SystemIcon, TypographyScale, ESystemIconNames } from '@mdb/flora';
import { FilterItem } from '.';
import { tagWrapper } from '../../page-templates/content-type/styles';

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
