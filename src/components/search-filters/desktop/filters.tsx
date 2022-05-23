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
    expertiseLevelItems,
    contentTypeItems = [],
    codeLevelItems = [],
}) => {
    return (
        <div className={className}>
            {!!codeLevelItems.length && (
                <FilterGroup
                    title="Example Type"
                    items={codeLevelItems}
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
            {!!technologyItems.length && (
                <FilterGroup
                    title="Technology"
                    items={technologyItems}
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
            {!!l1Items.length && (
                <FilterGroup
                    title="Products"
                    items={l1Items}
                    filters={allFilters}
                    setFilters={onFilter}
                />
            )}

            {!!expertiseLevelItems.length && (
                <FilterGroup
                    title="Expertise Level"
                    items={expertiseLevelItems}
                    filters={allFilters}
                    setFilters={onFilter}
                />
            )}
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
