import { useState, memo } from 'react';
import {
    TypographyScale,
    SystemIcon,
    ESystemIconNames,
    RadioGroup,
    Radio,
} from '@mdb/flora';

import { FilterItem } from '@mdb/devcenter-components';

import { RadioFilterGroupProps } from './types';
import { titleStyles, itemsStyles } from './styles';
import { sortByOptions } from '../search/utils';

const FILTER_STEP = 5;

const RadioFilterGroup: React.FunctionComponent<RadioFilterGroupProps> = memo(
    ({
        className,
        title,
        items,
        filters,
        isMobile = false,
        setSort = () => null,
        sortBy,
    }) => {
        const [expanded, setExpanded] = useState<boolean>(
            isMobile ? false : true
        );

        const onExpand = () => {
            setExpanded(!expanded);
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
                    if (item.subFilters) {
                        filterList = filterList.concat(
                            getFilterNames(item.subFilters)
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
RadioFilterGroup.displayName = 'RadioFilterGroup';
export default RadioFilterGroup;
