import { useState } from 'react';
import type { NextPage } from 'next';
import { GridLayout, TypographyScale } from '@mdb/flora';

import { PillCategory } from '../../types/pill-category';
import FilterGroup from '../../components/filter-group';

const languageFilterItems = [
    {
        name: 'C',
    },
    {
        name: 'CSharp',
    },
    {
        name: 'C++',
    },
    {
        name: 'Go',
    },
    {
        name: 'Java',
    },
    {
        name: 'Javascript',
    },
    {
        name: 'Kotlin',
    },
    {
        name: 'PHP',
    },
    {
        name: 'Python',
    },
];

const technologyFilterItems = [
    {
        name: 'Docker',
    },
    {
        name: 'Azure',
    },
    {
        name: 'AWS',
    },
    {
        name: 'GCP',
    },
    {
        name: 'FastAPI',
    },
    {
        name: 'Android',
    },
    {
        name: 'iOS',
    },
];

const expertiseLevelItems = [
    {
        name: 'Introductory',
    },
    {
        name: 'Expert',
    },
];

const contributedByItems = [
    {
        name: 'MongoDB',
    },
    {
        name: 'Community',
    },
    {
        name: 'Students',
    },
    {
        name: 'Champions',
    },
    {
        name: 'Partners',
    },
];

interface ContentTypePageProps {
    contentType: PillCategory;
}

const filterGroupContainer = {
    gridColumn: ['span 6', null, 'span 8', 'span 3'],
    display: ['none', null, null, 'flex'],
    flexDirection: 'column' as 'column',
    gap: 'inc50',
};

const pageWrapper = {
    paddingBottom: 'inc160',
    px: ['inc40', null, 'inc50', 'inc70'],
    paddingTop: ['inc40', null, 'inc50', 'inc70'],
};

const ContentTypePage: NextPage<ContentTypePageProps> = ({ contentType }) => {
    const [languageFilters, setLanguageFilters] = useState<string[]>([]);
    const [technologyFilters, setTechnologyFilters] = useState<string[]>([]);
    const [expertiseLevelFilters, setExpertiseLevelFilters] = useState<
        string[]
    >([]);
    const [contributedByFilters, setContributedByFilters] = useState<string[]>(
        []
    );

    return (
        <div sx={pageWrapper}>
            <TypographyScale variant="heading2">{contentType}s</TypographyScale>
            <GridLayout
                sx={{
                    rowGap: 0,
                }}
            >
                <div sx={filterGroupContainer}>
                    <FilterGroup
                        title="Language"
                        items={languageFilterItems}
                        filters={languageFilters}
                        setFilters={setLanguageFilters}
                    />
                    <FilterGroup
                        title="Technology"
                        items={technologyFilterItems}
                        filters={technologyFilters}
                        setFilters={setTechnologyFilters}
                    />
                    <FilterGroup
                        title="Expertise Level"
                        items={expertiseLevelItems}
                        filters={expertiseLevelFilters}
                        setFilters={setExpertiseLevelFilters}
                    />
                    <FilterGroup
                        title="Contributed By"
                        items={contributedByItems}
                        filters={contributedByFilters}
                        setFilters={setContributedByFilters}
                    />
                </div>
            </GridLayout>
        </div>
    );
};

export default ContentTypePage;
