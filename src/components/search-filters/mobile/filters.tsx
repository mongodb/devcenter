import { memo, useCallback, useState } from 'react';
import {
    ESystemIconNames,
    ButtonIcon,
    TypographyScale,
    HorizontalRule,
    Button,
} from '@mdb/flora';

import { FilterGroup, FilterItem } from '@mdb/devcenter-components';

import { FiltersProps } from '../types';

import RadioFilterGroup from '../radio-filter-group';
import { buttonSection, filtersModal, titleSection } from './styles';
import { defaultSortByType, SortByType } from '../../search/types';

interface MobileFiltersProps extends FiltersProps {
    closeModal: () => void;
    sortBy?: SortByType | '';
    onSort?: (sortByValue: SortByType) => void;
}

const MobileFilters: React.FunctionComponent<MobileFiltersProps> = memo(
    ({
        className,
        filterItems,
        filters,
        onFilter,
        onSort,
        sortBy,
        closeModal,
    }) => {
        const [tempFilters, setTempFilters] = useState<FilterItem[]>(filters);

        const onToggle = useCallback(
            (checked: boolean, filter: FilterItem) => {
                if (checked) {
                    if (filter.subFilters?.length) {
                        const subFiltersToAdd = filter.subFilters.filter(
                            subFilter =>
                                !tempFilters.find(
                                    ({ name, type }) =>
                                        name === subFilter.name &&
                                        type === subFilter.type
                                )
                        );
                        setTempFilters(
                            tempFilters.concat(filter).concat(subFiltersToAdd)
                        );
                    } else {
                        setTempFilters(tempFilters.concat(filter));
                    }
                } else {
                    setTempFilters(
                        tempFilters.filter(
                            ({ name, type }) =>
                                !(name === filter.name && type === filter.type)
                        )
                    );
                }
            },
            [tempFilters]
        );

        const showSorting = !!onSort;

        return (
            <div className={className} sx={filtersModal}>
                <div sx={{ padding: 'inc50', marginBottom: '120px' }}>
                    <div sx={titleSection}>
                        <TypographyScale>
                            Filter{showSorting ? ' & Sort' : ''}
                        </TypographyScale>
                        <ButtonIcon
                            iconName={ESystemIconNames.CLOSE}
                            variant="outline"
                            keepMobileOutline={true}
                            iconStrokeWeight="medium"
                            onClick={() => closeModal()}
                        />
                    </div>
                    <HorizontalRule spacing="small" />
                    {showSorting && (
                        <>
                            <RadioFilterGroup
                                title="Sort by"
                                items={[]}
                                sortBy={sortBy || defaultSortByType}
                                setSort={(value: string) =>
                                    onSort(value as SortByType)
                                }
                                filters={tempFilters}
                                isMobile
                            />
                            <HorizontalRule spacing="small" />
                        </>
                    )}
                    {filterItems.map(({ key, value }) => (
                        <>
                            <FilterGroup
                                title={key}
                                allFilters={value}
                                activeFilters={tempFilters}
                                onToggle={onToggle}
                                mobile
                                key={key}
                            />
                            <HorizontalRule spacing="small" />
                        </>
                    ))}
                </div>
                <div sx={buttonSection}>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            onFilter([]);
                            setTempFilters([]);
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={() => {
                            onFilter(tempFilters);
                            closeModal();
                        }}
                    >
                        Apply{' '}
                        {tempFilters.length ? `(${tempFilters.length})` : ''}
                    </Button>
                </div>
            </div>
        );
    }
);

MobileFilters.displayName = 'MobileFilters';

export default MobileFilters;
