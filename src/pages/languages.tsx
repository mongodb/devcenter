import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import { FlashCard, ESingleImageVariant, LogoPaths } from '@mdb/flora';
import { Grid, ThemeUICSSObject } from 'theme-ui';

import { languageToLogo } from '../utils/language-to-logo';
import allMetaInfoPreval from '../service/get-all-meta-info.preval';
import { MetaInfo } from '../interfaces/meta-info';
import { getURLPath } from '../utils/format-url-path';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

const getFlashCardStyles = (size: number, extraStyles?: ThemeUICSSObject) =>
    ({
        // Push CTA link to bottom of card.
        'div:nth-of-type(2)': {
            flexGrow: 1,
        },
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
}

const LanguagesPage: NextPage<LanguagesPageProps> = ({ languages }) => (
    <>
        <NextSeo title={'All Languages | MongoDB'} />
        <Hero crumbs={crumbs} name="All Languages" />
        <div
            sx={{
                px: ['inc40', null, 'inc50', 'inc70'],
                py: ['inc40', null, 'inc50', 'inc70'],
            }}
        >
            <Grid
                columns={[1, null, 2, 4]}
                gap="inc70"
                sx={{
                    maxWidth: 1416, // Same as flora's grid
                    mx: 'auto',
                }}
            >
                {languages.map(lang => {
                    const imageSrc = LogoPaths[languageToLogo[lang.tagName]];
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
        </div>
    </>
);

export default LanguagesPage;

export const getStaticProps: GetStaticProps<{
    languages: MetaInfo[];
}> = async () => {
    const languages = allMetaInfoPreval.filter(
        tag => tag.category === 'ProgrammingLanguage'
    );

    return {
        props: { languages },
    };
};
