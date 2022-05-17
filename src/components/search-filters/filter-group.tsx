import { useState, memo } from 'react';
import {
    TypographyScale,
    SystemIcon,
    ESystemIconNames,
    Checkbox,
    Link,
} from '@mdb/flora';
import theme from '@mdb/flora/theme';

import { FilterGroupProps, FilterItem } from './types';
import { titleStyles, itemsStyles } from './styles';

const FILTER_STEP = 5;

const FilterGroup: React.FunctionComponent<FilterGroupProps> = memo(
    ({ className, title, items, filters, setFilters, isMobile = false }) => {
        const [expanded, setExpanded] = useState<boolean>(
            isMobile ? false : true
        );
        const [showAll, setShowAll] = useState<boolean>(false);

        const onExpand = () => {
            setShowAll(false);
            setExpanded(!expanded);
        };

        const onCheckToggle = (checked: boolean, filter: FilterItem) => {
            if (checked) {
                if (filter.subItems && filter.subItems.length) {
                    const subItemsToAdd = filter.subItems.filter(
                        subItem =>
                            !filters.find(
                                ({ name, type }) =>
                                    name === subItem.name &&
                                    type === subItem.type
                            )
                    );
                    setFilters(filters.concat(filter).concat(subItemsToAdd));
                } else {
                    setFilters(filters.concat(filter));
                }
            } else {
                setFilters(
                    filters.filter(
                        ({ name, type }) =>
                            !(name === filter.name && type === filter.type)
                    )
                );
            }
        };

        const mobileFilterList = (() => {
            if (!title) return null;
            const getFilterNames = (items: FilterItem[]): string[] => {
                let filterList: string[] = [];

                items.forEach(item => {
                    if (filters.includes(item)) {
                        filterList.push(item.name);
                    }
                    if (item.subItems) {
                        filterList = filterList.concat(
                            getFilterNames(item.subItems)
                        );
                    }
                });
                return filterList;
            };
            const filterNames = getFilterNames(items);

            const filterString =
                filterNames.length < FILTER_STEP
                    ? filterNames.join(', ')
                    : `${filterNames.slice(0, FILTER_STEP).join(', ')} +${
                          filterNames.length - FILTER_STEP
                      }`;
            return (
                <TypographyScale variant="body1" color="mark">
                    {filterString}
                </TypographyScale>
            );
        })();

        return (
            <div className={className}>
                {!!title && (
                    <div onClick={onExpand}>
                        <div sx={titleStyles}>
                            <TypographyScale variant="body1">
                                {title}
                            </TypographyScale>
                            <SystemIcon
                                size="small"
                                strokeWeight="medium"
                                name={ESystemIconNames.CHEVRON_DOWN}
                                sx={{
                                    transform: expanded
                                        ? 'rotate(180deg)'
                                        : null,
                                }}
                            />
                        </div>
                        {isMobile && !expanded && mobileFilterList}
                    </div>
                )}
                {expanded && (
                    <>
                        <div sx={itemsStyles(title)}>
                            {items
                                .slice(0, showAll ? undefined : FILTER_STEP) // Show FILTER_STEP to start, then all if they click "Show more"
                                .map(item => {
                                    const { subItems, name, type, count } =
                                        item;
                                    if (subItems && subItems.length) {
                                        return (
                                            <div
                                                // Need to specify mobile here or it gets confused with mobile and desktop checkboxes present.
                                                key={`${name} ${type} ${
                                                    isMobile ? 'mobile' : ''
                                                }`}
                                            >
                                                <Checkbox
                                                    name={`${name} ${type} ${
                                                        isMobile ? 'mobile' : ''
                                                    }`}
                                                    label={`${name} (${count})`}
                                                    onToggle={checked =>
                                                        onCheckToggle(
                                                            checked,
                                                            item
                                                        )
                                                    }
                                                    checked={
                                                        !!filters.find(
                                                            filter =>
                                                                filter.type ===
                                                                    type &&
                                                                filter.name ===
                                                                    name
                                                        )
                                                    }
                                                />
                                                <FilterGroup
                                                    sx={{ marginLeft: 'inc40' }}
                                                    items={subItems}
                                                    filters={filters}
                                                    setFilters={setFilters}
                                                />
                                            </div>
                                        );
                                    }
                                    return (
                                        <Checkbox
                                            key={`${name} ${type} ${
                                                isMobile ? 'mobile' : ''
                                            }`}
                                            name={`${name} ${type} ${
                                                isMobile ? 'mobile' : ''
                                            }`}
                                            label={`${name} (${count})`}
                                            onToggle={checked =>
                                                onCheckToggle(checked, item)
                                            }
                                            checked={
                                                !!filters.find(
                                                    filter =>
                                                        filter.type === type &&
                                                        filter.name === name
                                                )
                                            }
                                        />
                                    );
                                })}
                        </div>
                        {items.length > FILTER_STEP && (
                            <Link
                                onClick={() => setShowAll(!showAll)}
                                sx={{ marginTop: 'inc30' }}
                            >
                                Show {showAll ? 'less' : 'more'}
                            </Link>
                        )}
                    </>
                )}
            </div>
        );
    }
);
FilterGroup.displayName = 'FilterGroup';
export default FilterGroup;
