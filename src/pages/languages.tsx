import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import {
    TypographyScale,
    FlashCard,
    GridLayout,
    ESingleImageVariant,
    LogoPaths,
} from '@mdb/flora';
import { Grid, ThemeUICSSObject } from 'theme-ui';

import { languageToLogo } from '../utils/language-to-logo';
import allMetaInfoPreval from '../service/get-all-meta-info.preval';
import { MetaInfo } from '../interfaces/meta-info';
import { getURLPath } from '../utils/format-url-path';
import { h4Styles, h5Styles } from '../styled/layout';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

const getFlashCardStyles = (size: number, extraStyles?: ThemeUICSSObject) =>
    ({
        div: { minHeight: 'unset' },
        '>div:first-of-type>div:first-of-type': {
            // Janky, but flora doesn't support third party logos in these cards.
            width: size,
            height: size,
        },
        img: {
            width: size,
            height: size,
        },
        ...extraStyles,
    } as ThemeUICSSObject);

interface LanguagesPageProps {
    languages: MetaInfo[];
    featured: MetaInfo[];
}

const LanguagesSection: React.FunctionComponent<{ languages: MetaInfo[] }> = ({
    languages,
}) => (
    <Grid columns={[1, null, 2, 4]} gap="inc70">
        {languages.map(lang => {
            const imageSrc = LogoPaths[languageToLogo[lang.tagName]];
            // Flash card needs to be updated in Flora. Currently it contains nested <a> tags, which is not legal HTML.
            return (
                <FlashCard
                    key={lang.slug}
                    flashCard
                    alignment="left"
                    title={lang.tagName}
                    text={lang.description}
                    background={false}
                    imageConfig={{
                        src: imageSrc,
                        variant: ESingleImageVariant.NO_RATIO,
                    }}
                    imageryType={imageSrc ? 'image' : 'none'}
                    cta={{
                        type: 'link-arrow',
                        text: 'Learn More',
                        config: {
                            href: getURLPath(lang.slug),
                            linkIconDisableExpand: true, // Doesn't seem to work
                        },
                    }}
                    sx={getFlashCardStyles(64, { padding: 0 })}
                />
            );
        })}
    </Grid>
);

const LanguagesPage: NextPage<LanguagesPageProps> = ({
    languages,
    featured,
}) => (
    <>
        <NextSeo title={'All Languages | MongoDB'} />
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
                        variant="heading2"
                        sx={{ ...h5Styles, marginBottom: 'inc40' }}
                    >
                        Featured Languages
                    </TypographyScale>
                    <Grid
                        columns={[1, null, 2, 4]}
                        gap={['inc50', null, null, 'inc40']}
                    >
                        {featured.map(lang => {
                            const imageSrc =
                                LogoPaths[languageToLogo[lang.tagName]];
                            // Flash card needs to be updated in Flora. Currently it contains nested <a> tags, which is not legal HTML.
                            return (
                                <FlashCard
                                    flashCard
                                    key={lang.slug}
                                    sx={getFlashCardStyles(72, { py: 'inc60' })}
                                    title={lang.tagName}
                                    text={lang.description}
                                    imageConfig={{
                                        src: imageSrc,
                                        variant: ESingleImageVariant.NO_RATIO,
                                    }}
                                    imageryType={imageSrc ? 'image' : 'none'}
                                    cta={{
                                        type: 'link-arrow',
                                        text: 'Explore Content',
                                        config: {
                                            href: getURLPath(lang.slug),
                                            linkIconDisableExpand: true, // Doesn't seem to work
                                        },
                                    }}
                                />
                            );
                        })}
                    </Grid>
                </div>
                <div sx={{ gridColumn: ['span 6', null, 'span 8', 'span 12'] }}>
                    <TypographyScale
                        variant="heading2"
                        sx={{
                            ...h4Styles,
                            marginBottom: 'inc90',
                            width: 'max-content',
                        }}
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
    const languages = allMetaInfoPreval.filter(
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
    const python = languages.filter(
        ({ slug }) => slug === '/languages/python'
    )[0];
    const featured = [js, java, csharp, c, python].filter(lang => !!lang);

    return {
        props: { languages, featured },
    };
};
