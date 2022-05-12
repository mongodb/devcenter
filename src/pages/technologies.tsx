import { NextPage, GetStaticProps } from 'next';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import {
    FlashCard,
    GridLayout,
    ESingleImageVariant,
    ImageryType,
    CTAType,
} from '@mdb/flora';
import { Grid } from 'theme-ui';

import { getDistinctTags } from '../service/get-distinct-tags';
import { Tag } from '../interfaces/tag';
import { LogoPaths } from '../utils/logoPaths';
import { technologyToLogo } from '../utils/technology-to-logo';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

interface TechnologiesPageProps {
    technologies: Tag[];
}

const TechnologiesSection: React.FunctionComponent<{ technologies: Tag[] }> = ({
    technologies,
}) => {
    return (
        <Grid columns={[1, null, 2, 4]} gap="inc70">
            {technologies.map(tech => {
                const flashCardProps = {
                    imageConfig: {
                        src: LogoPaths[technologyToLogo[tech.name]],
                        variant: ESingleImageVariant.NO_RATIO,
                    },
                    cta: {
                        type: 'link-arrow' as CTAType,
                        text: 'Learn More',
                        config: {
                            href: '/developer' + tech.slug,
                            linkIconDisableExpand: true, // Doesn't seem to work
                        },
                    },
                    imageryType: 'image' as ImageryType,
                    title: tech.name,
                    text: 'We still need descriptions for all of these right?',
                    background: false,
                    alignment: 'left' as 'left',
                };
                return (
                    <FlashCard
                        key={tech.slug}
                        {...flashCardProps}
                        sx={{
                            boxSizing: 'border-box' as 'border-box',
                            div: { minHeight: 'unset' },
                            '>div:first-of-type>div:first-of-type': {
                                // Janky, but flora doesn't support third party logos in these cards.
                                width: 64,
                                height: 64,
                            },
                            img: {
                                width: 64,
                                height: 64,
                            },
                            padding: 0,
                        }}
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
    technologies: Tag[];
}> = async () => {
    const distinctTags = await getDistinctTags();
    const technologies = distinctTags.filter(tag => tag.type === 'Technology');

    return { props: { technologies } };
};
