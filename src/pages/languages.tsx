import { NextPage, GetStaticProps } from 'next';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import {
    TypographyScale,
    FlashCard,
    GridLayout,
    ESingleImageVariant,
    ImageryType,
    CTAType,
    LogoPaths,
} from '@mdb/flora';
import { Grid } from 'theme-ui';

import { languageToLogo } from '../utils/language-to-logo';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { MetaInfo } from '../interfaces/meta-info';
import { getURLPath } from '../utils/format-url-path';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

const featuredConfig = (lang: MetaInfo) => {
    const imageSrc = LogoPaths[languageToLogo[lang.tagName]];
    return {
        imageConfig: {
            src: imageSrc,
            variant: ESingleImageVariant.NO_RATIO,
        },
        cta: {
            type: 'link-arrow' as CTAType,
            text: 'Explore Content',
            config: {
                href: getURLPath(lang.slug),
                linkIconDisableExpand: true, // Doesn't seem to work
            },
        },
        imageryType: (imageSrc ? 'image' : 'none') as ImageryType,
        title: lang.tagName,
        text: lang.description,
    };
};

const flashCardStyles = {
    boxSizing: 'border-box' as 'border-box',
    div: { minHeight: 'unset' },
    py: 'inc60',
    '>div:first-of-type>div:first-of-type': {
        // Janky, but flora doesn't support third party logos in these cards.
        width: 72,
        height: 72,
    },
    img: {
        width: 72,
        height: 72,
    },
};

interface LanguagesPageProps {
    languages: MetaInfo[];
    featured: MetaInfo[];
}

const LanguagesSection: React.FunctionComponent<{ languages: MetaInfo[] }> = ({
    languages,
}) => {
    return (
        <Grid columns={[1, null, 2, 4]} gap="inc70">
            {languages.map(lang => {
                const imageSrc = LogoPaths[languageToLogo[lang.tagName]];
                const flashCardProps = {
                    imageConfig: {
                        src: imageSrc,
                        variant: ESingleImageVariant.NO_RATIO,
                    },
                    cta: {
                        type: 'link-arrow' as CTAType,
                        text: 'Learn More',
                        config: {
                            href: getURLPath(lang.slug),
                            linkIconDisableExpand: true, // Doesn't seem to work
                        },
                    },
                    imageryType: (imageSrc ? 'image' : 'none') as ImageryType,
                    title: lang.tagName,
                    text: lang.description,
                    background: false,
                    alignment: 'left' as 'left',
                };
                return (
                    <FlashCard
                        key={lang.slug}
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
const LanguagesPage: NextPage<LanguagesPageProps> = ({
    languages,
    featured,
}) => (
    <>
        <Hero crumbs={crumbs} name="All Languages" />
        <div
            sx={{
                paddingBottom: 'inc160',
                px: ['inc40', null, 'inc50', 'inc70'],
                paddingTop: ['inc40', null, 'inc50', 'inc70'],
            }}
        >
            <GridLayout>
                <div
                    sx={{
                        gridColumn: ['span 6', null, 'span 8', 'span 12'],
                        marginBottom: ['section40', null, null, 'section50'],
                    }}
                >
                    <TypographyScale
                        variant="heading5"
                        sx={{ marginBottom: 'inc40' }}
                    >
                        Featured Languages
                    </TypographyScale>
                    <Grid
                        columns={[1, null, 2, 4]}
                        gap={['inc50', null, null, 'inc40']}
                    >
                        {featured.map(lang => (
                            <FlashCard
                                key={lang.slug}
                                sx={flashCardStyles}
                                {...featuredConfig(lang)}
                            />
                        ))}
                    </Grid>
                </div>
                <div sx={{ gridColumn: ['span 6', null, 'span 8', 'span 12'] }}>
                    <TypographyScale
                        variant="heading4"
                        sx={{ marginBottom: 'inc90', width: 'max-content' }}
                    >
                        All Languages
                    </TypographyScale>
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'inc70',
                        }}
                    >
                        <LanguagesSection languages={languages} />
                    </div>
                </div>
            </GridLayout>
        </div>
    </>
);

export default LanguagesPage;

export const getStaticProps: GetStaticProps<{
    languages: MetaInfo[];
    featured: MetaInfo[];
}> = async () => {
    const tags = await getAllMetaInfo();

    const languages = tags.filter(
        tag => tag.category === 'ProgrammingLanguage'
    );

    const js = languages.filter(
        ({ slug }) => slug === '/languages/javascript'
    )[0];
    const java = languages.filter(({ slug }) => slug === '/languages/java')[0];
    const csharp = languages.filter(
        ({ slug }) => slug === '/languages/csharp'
    )[0];
    const c = languages.filter(({ slug }) => slug === '/languages/c')[0];
    const featured = [js, java, csharp, c].filter(lang => !!lang);

    return { props: { languages, featured } };
};
