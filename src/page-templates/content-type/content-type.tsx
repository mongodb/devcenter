import { useState } from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import {
    GridLayout,
    TypographyScale,
    TextInput,
    ESystemIconNames,
} from '@mdb/flora';

import { PillCategory } from '../../types/pill-category';
import FilterGroup from '../../components/filter-group';
import { fetcherv2 } from '../../components/search/utils';
import Results from '../../components/search/results';

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

const searchBoxStyles = {
    '& > div': {
        width: '100%',
    },
    marginBottom: ['inc30', null, 'inc70'],
};

const ContentTypePage: NextPage<ContentTypePageProps> = ({ contentType }) => {
    const [languageFilters, setLanguageFilters] = useState<string[]>([]);
    const [technologyFilters, setTechnologyFilters] = useState<string[]>([]);
    // const [expertiseLevelFilters, setExpertiseLevelFilters] = useState<
    //     string[]
    // >([]);
    const [contributedByFilters, setContributedByFilters] = useState<string[]>(
        []
    );
    const [searchString, setSearchString] = useState<string>('');

    const getKey = () => {
        return searchString || ' ';
    };

    const { data, error, isValidating } = useSWR(getKey, fetcherv2, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    });

    const filteredData =
        !data ||
        (!languageFilters.length &&
            !technologyFilters.length &&
            // !expertiseLevelFilters.length &&
            !contributedByFilters.length)
            ? data
            : data.filter(
                  ({ tags }) =>
                      languageFilters.some(
                          filter =>
                              tags.programmingLanguage.indexOf(filter) >= 0
                      ) ||
                      technologyFilters.some(
                          filter => tags.technology.indexOf(filter) >= 0
                      ) ||
                      contributedByFilters.includes(tags.authorType)
              );

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchString(event.target.value);

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
                    {/* <FilterGroup
                        title="Expertise Level"
                        items={expertiseLevelItems}
                        filters={expertiseLevelFilters}
                        setFilters={setExpertiseLevelFilters}
                    /> */}
                    <FilterGroup
                        title="Contributed By"
                        items={contributedByItems}
                        filters={contributedByFilters}
                        setFilters={setContributedByFilters}
                    />
                </div>
                <div sx={{ gridColumn: ['span 6', null, 'span 8', 'span 9'] }}>
                    <div sx={searchBoxStyles}>
                        <TextInput
                            name="search-text-input"
                            label={`Search ${contentType}`}
                            iconName={ESystemIconNames.SEARCH}
                            value={searchString}
                            onChange={onSearch}
                        />
                    </div>
                    {filteredData && (
                        <Results
                            data={[filteredData]}
                            isLoading={isValidating}
                            hasError={error}
                        />
                    )}
                </div>
            </GridLayout>
        </div>
    );
};

export default ContentTypePage;
