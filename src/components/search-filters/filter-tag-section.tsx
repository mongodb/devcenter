import { Link } from '@mdb/flora';
import FilterTag from './filter-tag';
import { FilterItem } from './types';

interface FilterTagSectionProps {
    allFilters: FilterItem[];
    filterTagsExpanded: boolean;
    setFilterTagsExpanded: (expanded: boolean) => void;
    onFilterTagClose: (filterTag: FilterItem) => void;
    clearFilters: () => void;
}

const FilterTagSection: React.FunctionComponent<FilterTagSectionProps> = ({
    allFilters,
    filterTagsExpanded,
    onFilterTagClose,
    setFilterTagsExpanded,
    clearFilters,
}) => {
    return (
        <div
            sx={{
                gap: 'inc30',
                flexWrap: 'wrap',
                display: ['none', null, null, 'flex'],
            }}
        >
            {allFilters.length > 5 ? (
                filterTagsExpanded ? (
                    <>
                        {allFilters.map(filter => (
                            <FilterTag
                                key={`${filter.name} ${filter.type}`}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTagClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: 'Show less',
                                count: 0,
                                subItems: [],
                            }}
                            onClick={() => setFilterTagsExpanded(false)}
                        />
                    </>
                ) : (
                    <>
                        {allFilters.slice(0, 5).map(filter => (
                            <FilterTag
                                key={`${filter.name} ${filter.type}`}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTagClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: `+${allFilters.length - 5}`,
                                count: 0,
                                subItems: [],
                            }}
                            onClick={() => setFilterTagsExpanded(true)}
                        />
                    </>
                )
            ) : (
                allFilters.map(filter => (
                    <FilterTag
                        key={`${filter.name} ${filter.type}`}
                        filter={filter}
                        closeIcon={true}
                        onClick={onFilterTagClose}
                    />
                ))
            )}
            <Link onClick={clearFilters}>Clear all filters</Link>
        </div>
    );
};

export default FilterTagSection;
