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
}

const MobileFilters: React.FunctionComponent<MobileFiltersProps> = ({
    className,
    onFilter,
    allFilters,
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    contentTypeItems = [],
    closeModal,
}) => {
    const [tempFilters, setTempFilters] = useState<FilterItem[]>(allFilters);
    const onTempFilter = (filters: FilterItem[]) => setTempFilters(filters);
    return (
        <div className={className} sx={filtersModal}>
            <div sx={{ padding: 'inc50', marginBottom: '120px' }}>
                <div sx={titleSection}>
                    <TypographyScale>Filter</TypographyScale>
                    <ButtonIcon
                        iconName={ESystemIconNames.CLOSE}
                        variant="outline"
                        keepMobileOutline={true}
                        iconStrokeWeight="medium"
                        onClick={() => closeModal()}
                    />
                </div>
                <HorizontalRule spacing="small" />
                {!!l1Items.length && (
                    <>
                        <FilterGroup
                            title="Products"
                            items={l1Items}
                            filters={tempFilters}
                            setFilters={onTempFilter}
                            isMobile={true}
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
                            isMobile={true}
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
                            isMobile={true}
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
                            isMobile={true}
                        />
                        <HorizontalRule spacing="small" />
                    </>
                )}
                {/* <FilterGroup
        title="Expertise Level"
        items={expertiseLevelItems}
        filters={expertiseLevelFilters}
        setFilters={setExpertiseLevelFilters}
        isMobile={true}
    /> */}
                {!!contributedByItems.length && (
                    <FilterGroup
                        title="Contributed By"
                        items={contributedByItems}
                        filters={tempFilters}
                        setFilters={onTempFilter}
                        isMobile={true}
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
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default MobileFilters;
