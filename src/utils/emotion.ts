import { prefixer } from 'stylis';
import type { Theme } from 'theme-ui';
import type { StylisPlugin, StylisElement } from '@emotion/cache';
import createCache from '@emotion/cache';

const FONT_DOMAINS = ['https://static.mongodb.com/com/fonts/'];

const fontURLTransformer =
    (theme: Theme): StylisPlugin =>
    (element: StylisElement) => {
        const { type, props, children } = element;

        // Get the unique font family values from flora
        const fonts = [...new Set(Object.values(theme.fonts as string[]))];

        if (type === 'decl' && props === 'src') {
            // src should be grouped with a font-family declaration under @font-face {}
            const family = (
                element?.parent?.children as StylisElement[]
            ).filter(c => c.props === 'font-family')?.[0]?.children as string;

            // Ensure that we're only transforming URLs of flora fonts
            if (family && fonts.indexOf(family) > -1) {
                FONT_DOMAINS.forEach(domain => {
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
                    const escapedDomain = domain.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        '\\$&'
                    );
                    const content = children.toString().trim();

                    /*
                    Match a string like "url(https://https://static.mongodb.com/com/fonts/EuclidCircularA-Medium-WebXL.woff2) format('woff2');" 
                    and capture the font file name ("EuclidCircularA-Medium-WebXL.woff2") and anything after ("format('woff2')")
                */
                    const match = new RegExp(
                        `url\\(${escapedDomain}([a-zA-Z0-9\_\-]+\.[a-zA-Z0-9\_\-]+)\\)(.*)`,
                        'g'
                    ).exec(content);

                    if (match && match[2] && fonts.indexOf(match[1]) > -1) {
                        const localFontPath = `/developer/fonts/${match[1]}`;
                        element.return = `src:url(${localFontPath})${match[2]};`;
                    }
                });
            }
        }
    };

export const customCache = (theme: Theme) =>
    createCache({
        key: 'css',
        stylisPlugins: [fontURLTransformer(theme), prefixer],
    });
