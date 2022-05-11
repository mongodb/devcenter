import { FiltersProps } from '../types';
import FilterGroup from '../filter-group';

const DesktopFilters: React.FunctionComponent<FiltersProps> = ({
    className,
    onFilter,
    allFilters,
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    contentTypeItems = [],
}) => {
    return (
        <div className={className}>
            {!!l1Items.length && (
                <FilterGroup
                    title="Products"
                    items={l1Items}
                    filters={allFilters}
                    setFilters={onFilter}
                />
            )}
            {!!languageItems.length && (
                <FilterGroup
                    title="Language"
                    items={languageItems}
                    filters={allFilters}
                    setFilters={onFilter}
                />
            )}
            {!!contentTypeItems.length && (
                <FilterGroup
                    title="Content Type"
                    items={contentTypeItems}
                    filters={allFilters}
                    setFilters={onFilter}
                />
            )}
            {!!technologyItems.length && (
                <FilterGroup
                    title="Technology"
                    items={technologyItems}
                    filters={allFilters}
                    setFilters={onFilter}
                />
            )}
            {/* <FilterGroup
        title="Expertise Level"
        items={expertiseLevelItems}
        filters={expertiseLevelFilters}
        setFilters={setExpertiseLevelFilters}
    /> */}
            {!!contributedByItems.length && (
                <FilterGroup
                    title="Contributed By"
                    items={contributedByItems}
                    filters={allFilters}
                    setFilters={onFilter}
                />
            )}
        </div>
    );
};

export default DesktopFilters;
