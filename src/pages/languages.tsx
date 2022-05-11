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
} from '@mdb/flora';
import { Grid } from 'theme-ui';

import { getDistinctTags } from '../service/get-distinct-tags';
import { Tag } from '../interfaces/tag';
import { languageToLogo } from '../utils/language-to-logo';
import { LogoPaths } from '../utils/logoPaths';

const crumbs: Crumb[] = [
    { text: 'MongoDB Developer Center', url: '/developer' },
    { text: 'Developer Topics', url: '/developer/topics' },
];

const jsFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/ks67pb1b0pxch9df4-lang_javascript.svg?auto=format%252Ccompress',
        variant: ESingleImageVariant.NO_RATIO,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Explore Content',
        config: {
            href: '/developer/languages/javascript',
            linkIconDisableExpand: true, // Doesn't seem to work
        },
    },
    imageryType: 'image' as ImageryType,
    title: 'Javascript',
    text: 'We still need descriptions for all of these right?',
};
const javaFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/ks67or52h1vtq9spj-lang_java_logomark.svg?auto=format%252Ccompress',
        variant: ESingleImageVariant.NO_RATIO,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Explore Content',
        config: {
            href: '/developer/languages/java',
            linkIconDisableExpand: true, // Doesn't seem to work
        },
    },
    imageryType: 'image' as ImageryType,
    title: 'Java',
    text: 'We still need descriptions for all of these right?',
};

const cSharpFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/ks67l72x98g3whceo-lang_c_sharp.svg?auto=format%252Ccompress',
        variant: ESingleImageVariant.NO_RATIO,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Explore Content',
        config: {
            href: '/developer/languages/csharp',
            linkIconDisableExpand: true, // Doesn't seem to work
        },
    },
    imageryType: 'image' as ImageryType,
    title: 'C#',
    text: 'We still need descriptions for all of these right?',
};

const cFeaturedConfig = {
    imageConfig: {
        src: 'https://webimages.mongodb.com/_com_assets/cms/ks66s0ohwdti1j4es-lang_c.svg?auto=format%252Ccompress',
        variant: ESingleImageVariant.NO_RATIO,
    },
    cta: {
        type: 'link-arrow' as CTAType,
        text: 'Learn More',
        config: {
            href: '/developer/languages/c',
            linkIconDisableExpand: true, // Doesn't seem to work
        },
    },
    imageryType: 'image' as ImageryType,
    title: 'C',
    text: 'We still need descriptions for all of these right?',
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
    languages: Tag[];
}

const LanguagesSection: React.FunctionComponent<{ languages: Tag[] }> = ({
    languages,
}) => {
    return (
        <Grid columns={[1, null, 2, 4]} gap="inc70">
            {languages.map(lang => {
                const flashCardProps = {
                    imageConfig: {
                        src: LogoPaths[languageToLogo[lang.name]],
                        variant: ESingleImageVariant.NO_RATIO,
                    },
                    cta: {
                        type: 'link-arrow' as CTAType,
                        text: 'Learn More',
                        config: {
                            href: '/developer' + lang.slug,
                            linkIconDisableExpand: true, // Doesn't seem to work
                        },
                    },
                    imageryType: 'image' as ImageryType,
                    title: lang.name,
                    text: 'We still need descriptions for all of these right?',
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
const LanguagesPage: NextPage<LanguagesPageProps> = ({ languages }) => (
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
                        <FlashCard sx={flashCardStyles} {...jsFeaturedConfig} />
                        <FlashCard
                            sx={flashCardStyles}
                            {...javaFeaturedConfig}
                        />
                        <FlashCard
                            sx={flashCardStyles}
                            {...cSharpFeaturedConfig}
                        />
                        <FlashCard sx={flashCardStyles} {...cFeaturedConfig} />
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
    languages: Tag[];
}> = async () => {
    const distinctTags = await getDistinctTags();
    const languages = distinctTags.filter(
        tag => tag.type === 'ProgrammingLanguage'
    );

    return { props: { languages } };
};
