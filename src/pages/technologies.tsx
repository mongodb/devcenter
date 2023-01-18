import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import { GridLayout, LogoPaths, BrandedIcon, ThirdPartyLogo } from '@mdb/flora';
import { TopicCard } from '@mdb/devcenter-components';
import { Grid } from 'theme-ui';

import { technologyToLogo } from '../utils/technology-to-logo';
import allMetaInfoPreval from '../service/get-all-meta-info.preval';
import { MetaInfo } from '../interfaces/meta-info';
import { iconStyles } from '../components/topic-cards-container/styles';
import { getURLPath } from '../utils/format-url-path';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

interface TechnologiesPageProps {
    technologies: MetaInfo[];
}

const TechnologiesSection: React.FunctionComponent<{
    technologies: MetaInfo[];
}> = ({ technologies }) => {
    return (
        <Grid columns={[1, null, 2, 4]} gap="inc70">
            {technologies.map(({ tagName, slug }) => {
                const hasLogo =
                    tagName === 'Serverless' ||
                    LogoPaths[technologyToLogo[tagName]];
                let icon: JSX.Element | null = null;
                if (hasLogo) {
                    if (tagName === 'Serverless') {
                        icon = (
                            <BrandedIcon
                                sx={iconStyles}
                                name="atlas_serverless"
                            />
                        );
                    } else {
                        icon = (
                            <ThirdPartyLogo
                                sx={iconStyles}
                                variant={technologyToLogo[tagName]}
                                href={slug}
                            />
                        );
                    }
                }
                return (
                    <TopicCard
                        key={tagName}
                        title={tagName}
                        href={getURLPath(slug)}
                        icon={icon}
                    />
                );
            })}
        </Grid>
    );
};
const TechnologiesPage: NextPage<TechnologiesPageProps> = ({
    technologies,
}) => (
    <>
        <NextSeo title={'All Technologies | MongoDB'} />
        <Hero crumbs={crumbs} name="All Technologies" />
        <div
            sx={{
                paddingBottom: 'inc160',
                px: ['inc40', null, 'inc50', 'inc70'],
                paddingTop: ['inc40', null, 'inc50', 'inc70'],
            }}
        >
            <GridLayout>
                <div sx={{ gridColumn: ['span 6', null, 'span 8', 'span 12'] }}>
                    <TechnologiesSection technologies={technologies} />
                </div>
            </GridLayout>
        </div>
    </>
);

export default TechnologiesPage;

export const getStaticProps: GetStaticProps<{
    technologies: MetaInfo[];
}> = async () => {
    const technologies = allMetaInfoPreval
        .filter(tag => tag.category === 'Technology')
        .sort((prev, next) =>
            prev.tagName.toLowerCase().localeCompare(next.tagName.toLowerCase())
        );

    return {
        props: { technologies },
    };
};
