import { useState, memo } from 'react';
import {
    TypographyScale,
    SystemIcon,
    ESystemIconNames,
    Checkbox,
    Link,
    RadioGroup,
    Radio,
} from '@mdb/flora';

import { FilterGroupProps, FilterItem } from './types';
import { titleStyles, itemsStyles } from './styles';
import { sortByOptions } from '../search/utils';

const FILTER_STEP = 5;

const FilterGroup: React.FunctionComponent<FilterGroupProps> = memo(
    ({
        className,
        title,
        items,
        filters,
        setFilters = () => {},
        isMobile = false,
        setSort = () => {},
        sortBy,
    }) => {
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
            if (sortBy) {
                return (
                    <TypographyScale variant="body1" color="mark">
                        {sortBy}
                    </TypographyScale>
                );
            }
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
                    <div sx={itemsStyles(title)}>
                        {!sortBy && (
                            <>
                                {items
                                    .slice(0, showAll ? undefined : FILTER_STEP) // Show FILTER_STEP to start, then all if they click "Show more"
                                    .map(item => {
                                        const { subItems, name, type } = item;
                                        const hasSubItems =
                                            subItems && !!subItems.length;
                                        const key = `${name} ${type} ${
                                            isMobile ? 'mobile' : ''
                                        }`;

                                        return (
                                            <div
                                                key={
                                                    hasSubItems
                                                        ? key
                                                        : undefined
                                                }
                                            >
                                                <Checkbox
                                                    name={key}
                                                    label={name}
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
                                                {hasSubItems && (
                                                    <FilterGroup
                                                        sx={{
                                                            marginLeft: 'inc40',
                                                        }}
                                                        items={subItems}
                                                        filters={filters}
                                                        setFilters={setFilters}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}

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

                        {sortBy && (
                            <RadioGroup
                                name={title || 'RadioGroup'}
                                onChange={setSort}
                                defaultChecked={sortBy}
                                customStyles={{
                                    // TODO: Remove custom styling once "box-sizing: border-box" is set globally
                                    '& *': {
                                        boxSizing: 'border-box',
                                    },
                                    'span[aria-label="radio-button-container"]':
                                        {
                                            width: [20, null, null, 24],
                                            height: [20, null, null, 24],
                                        },
                                    'span[aria-label="radio-button"]::after': {
                                        height: [10, null, null, 12],
                                        width: [10, null, null, 12],
                                        top: [3, null, null, 4],
                                        left: [3, null, null, 4],
                                    },
                                }}
                            >
                                {Object.keys(sortByOptions).map(
                                    (filterType: string, index: number) => (
                                        <Radio key={index} value={filterType}>
                                            {filterType}
                                        </Radio>
                                    )
                                )}
                            </RadioGroup>
                        )}
                    </div>
                )}
            </div>
        );
    }
);
FilterGroup.displayName = 'FilterGroup';
export default FilterGroup;
