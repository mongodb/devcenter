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

interface ContentTypePageProps {
    contentType: PillCategory;
}

const ContentTypePage: NextPage<ContentTypePageProps> = ({ contentType }) => {
    const [languageFilters, setLanguageFilters] = useState<string[]>([]);
    console.log(languageFilters);

    return (
        <div
            sx={{
                paddingBottom: 'inc160',
                px: ['inc40', null, 'inc50', 'inc70'],
                paddingTop: ['inc40', null, 'inc50', 'inc70'],
            }}
        >
            <TypographyScale variant="heading2">{contentType}s</TypographyScale>
            <GridLayout
                sx={{
                    rowGap: 0,
                }}
            >
                <div
                    sx={{
                        gridColumn: ['span 6', null, 'span 8', 'span 3'],
                        display: ['none', null, null, 'block'],
                    }}
                >
                    <FilterGroup
                        title="Language"
                        items={languageFilterItems}
                        filters={languageFilters}
                        setFilters={setLanguageFilters}
                    />
                </div>
            </GridLayout>
        </div>
    );
};

export default ContentTypePage;
