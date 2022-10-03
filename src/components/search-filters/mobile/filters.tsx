import { useState } from 'react';
import {
    ESystemIconNames,
    ButtonIcon,
    TypographyScale,
    HorizontalRule,
    Button,
} from '@mdb/flora';

import { FilterItem, FiltersProps } from '../types';
import FilterGroup from '../filter-group';
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
    const onTempFilter = (filters: FilterItem[]) => {
        setTempFilters(filters);
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
                    <FilterGroup
                        title="Sort by"
                        items={[]}
                        sortBy={sortBy}
                        setSort={onSort}
                        filters={tempFilters}
                        isMobile
                        isRadio
                    />
                    <HorizontalRule spacing="small" />
                </>
                {!!codeLevelItems.length && (
                    <>
                        <FilterGroup
                            title="Example Type"
                            items={codeLevelItems}
                            filters={tempFilters}
                            setFilters={onTempFilter}
                            isMobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!languageItems.length && (
                    <>
                        <FilterGroup
                            title="Language"
                            items={languageItems}
                            filters={tempFilters}
                            setFilters={onTempFilter}
                            isMobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!technologyItems.length && (
                    <>
                        <FilterGroup
                            title="Technology"
                            items={technologyItems}
                            filters={tempFilters}
                            setFilters={onTempFilter}
                            isMobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!contentTypeItems.length && (
                    <>
                        <FilterGroup
                            title="Content Type"
                            items={contentTypeItems}
                            filters={tempFilters}
                            setFilters={onTempFilter}
                            isMobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {!!l1Items.length && (
                    <>
                        <FilterGroup
                            title="Products"
                            items={l1Items}
                            filters={tempFilters}
                            setFilters={onTempFilter}
                            isMobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}

                {!!expertiseLevelItems.length && (
                    <>
                        <FilterGroup
                            title="Expertise Level"
                            items={expertiseLevelItems}
                            filters={tempFilters}
                            setFilters={onTempFilter}
                            isMobile
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}

                {!!contributedByItems.length && (
                    <FilterGroup
                        title="Contributed By"
                        items={contributedByItems}
                        filters={tempFilters}
                        setFilters={onTempFilter}
                        isMobile
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
