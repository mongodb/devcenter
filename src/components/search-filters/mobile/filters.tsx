import { useState } from 'react';
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

interface MobileFiltersProps extends FiltersProps {
    closeModal: () => void;
    sortBy: any;
    onSort: (sortByValue: string) => void;
}

const MobileFilters: React.FunctionComponent<MobileFiltersProps> = ({
    sortBy,
    onSort,
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
    closeModal,
}) => {
    const [tempFilters, setTempFilters] = useState<FilterItem[]>(allFilters);
    const onToggle = (checked: boolean, filter: FilterItem) => {
        if (checked) {
            if (filter.subFilters && filter.subFilters.length) {
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
    };

    return (
        <div className={className} sx={filtersModal}>
            <div sx={{ padding: 'inc50', marginBottom: '120px' }}>
                <div sx={titleSection}>
                    <TypographyScale>Filter & Sort</TypographyScale>
                    <ButtonIcon
                        iconName={ESystemIconNames.CLOSE}
                        variant="outline"
                        keepMobileOutline={true}
                        iconStrokeWeight="medium"
                        onClick={() => closeModal()}
                    />
                </div>
                <HorizontalRule spacing="small" />
                <>
                    <RadioFilterGroup
                        title="Sort by"
                        items={[]}
                        sortBy={sortBy}
                        setSort={onSort}
                        filters={tempFilters}
                        isMobile
                    />
                    <HorizontalRule spacing="small" />
                </>
                {!!codeLevelItems.length && (
                    <>
                        <FilterGroup
                            title="Example Type"
                            allFilters={codeLevelItems}
                            activeFilters={tempFilters}
                            onToggle={onToggle}
                            mobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!languageItems.length && (
                    <>
                        <FilterGroup
                            title="Language"
                            allFilters={languageItems}
                            activeFilters={tempFilters}
                            onToggle={onToggle}
                            mobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!technologyItems.length && (
                    <>
                        <FilterGroup
                            title="Technology"
                            allFilters={technologyItems}
                            activeFilters={tempFilters}
                            onToggle={onToggle}
                            mobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!contentTypeItems.length && (
                    <>
                        <FilterGroup
                            title="Content Type"
                            allFilters={contentTypeItems}
                            activeFilters={tempFilters}
                            onToggle={onToggle}
                            mobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!l1Items.length && (
                    <>
                        <FilterGroup
                            title="Products"
                            allFilters={l1Items}
                            activeFilters={tempFilters}
                            onToggle={onToggle}
                            mobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}

                {!!expertiseLevelItems.length && (
                    <>
                        <FilterGroup
                            title="Expertise Level"
                            allFilters={expertiseLevelItems}
                            activeFilters={tempFilters}
                            onToggle={onToggle}
                            mobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}

                {!!contributedByItems.length && (
                    <FilterGroup
                        title="Contributed By"
                        allFilters={contributedByItems}
                        activeFilters={tempFilters}
                        onToggle={onToggle}
                        mobile
                    />
                )}
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
                    Apply {tempFilters.length ? `(${tempFilters.length})` : ''}
                </Button>
            </div>
        </div>
    );
};

export default MobileFilters;
