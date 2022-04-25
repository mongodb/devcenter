import { SystemIcon, TypographyScale, ESystemIconNames } from '@mdb/flora';
import theme from '@mdb/flora/theme';
import { FilterItem } from '../types';
import FilterGroup from './filter-group';

interface FiltersProps {
    className?: string;
    onFilter: (filters: FilterItem[]) => void;
    allFilters: FilterItem[];
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
}

const DesktopFilters: React.FunctionComponent<FiltersProps> = ({
    className,
    onFilter,
    allFilters,
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
}) => {
    return (
        <div className={className}>
            <FilterGroup
                title="Products"
                items={l1Items}
                filters={allFilters}
                setFilters={onFilter}
            />
            <FilterGroup
                title="Language"
                items={languageItems}
                filters={allFilters}
                setFilters={onFilter}
            />
            <FilterGroup
                title="Technology"
                items={technologyItems}
                filters={allFilters}
                setFilters={onFilter}
            />
            {/* <FilterGroup
        title="Expertise Level"
        items={expertiseLevelItems}
        filters={expertiseLevelFilters}
        setFilters={setExpertiseLevelFilters}
    /> */}
            <FilterGroup
                title="Contributed By"
                items={contributedByItems}
                filters={allFilters}
                setFilters={onFilter}
            />
        </div>
    );
};

export default DesktopFilters;
