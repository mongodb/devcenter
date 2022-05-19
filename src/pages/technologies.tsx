import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import {
    FlashCard,
    GridLayout,
    ESingleImageVariant,
    ImageryType,
    CTAType,
    LogoPaths,
} from '@mdb/flora';
import { Grid } from 'theme-ui';

import { technologyToLogo } from '../utils/technology-to-logo';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { MetaInfo } from '../interfaces/meta-info';
import { getURLPath } from '../utils/format-url-path';

// Temporary until we find a logo to include in Flora.
const serverlessLogo =
    'https://webimages.mongodb.com/_com_assets/icons/atlas_serverless.svg';

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
            {technologies.map(tech => {
                let imageProps;
                const hasLogo =
                    tech.tagName === 'Serverless' ||
                    LogoPaths[technologyToLogo[tech.tagName]];
                if (hasLogo) {
                    // Really annoying, but we have a special case where we use a branded icon for serverless.
                    if (tech.tagName === 'Serverless') {
                        imageProps = {
                            imageConfig: {
                                src: serverlessLogo,
                                variant: ESingleImageVariant.NO_RATIO,
                            },
                            imageryType: 'image' as ImageryType,
                        };
                    } else {
                        imageProps = {
                            imageConfig: {
                                src: LogoPaths[technologyToLogo[tech.tagName]],
                                variant: ESingleImageVariant.NO_RATIO,
                            },
                            imageryType: 'image' as ImageryType,
                        };
                    }
                } else {
                    imageProps = { imageryType: 'none' as ImageryType };
                }
                const flashCardProps = {
                    ...imageProps,
                    cta: {
                        type: 'link-arrow' as CTAType,
                        text: 'Learn More',
                        config: {
                            href: getURLPath(tech.slug),
                            linkIconDisableExpand: true, // Doesn't seem to work
                        },
                    },
                    title: tech.tagName,
                    text: tech.description,
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
        <NextSeo
            title={'All Technologies | MongoDB'}
            // description: '' #TODO
        />
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
    const tags = await getAllMetaInfo();
    const technologies = tags.filter(tag => tag.category === 'Technology');

    return { props: { technologies } };
};
