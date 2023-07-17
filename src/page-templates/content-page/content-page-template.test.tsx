import { render } from '@testing-library/react';
import { SEOprops, Seo } from './content-page-template';
import fs from 'fs';
import path from 'path';

jest.mock('next/head', () => {
    return {
        __esModule: true,
        default: ({ children }: { children: Array<React.ReactElement> }) => {
            return <>{children}</>;
        },
    };
});

function getMetaContentByProperty(property: string) {
    const metas = document.getElementsByTagName('meta');
    for (const meta of metas) {
        if (meta.getAttribute('property') === property) {
            return meta.getAttribute('content') ?? '';
        }
    }
    return '';
}

function getMetaContentByName(name: string) {
    const metas = document.getElementsByTagName('meta');
    for (const meta of metas) {
        if (meta.getAttribute('name') === name) {
            return meta.getAttribute('content') ?? '';
        }
    }
    return '';
}

describe('Seo', () => {
    it('should render meta tags', () => {
        let props;
        try {
            const filename = 'content-page-template-test-data.json';
            const filepath = path.join(__dirname, filename);
            const data = fs.readFileSync(filepath).toString('utf8');
            props = JSON.parse(data);
        } catch (err) {
            console.error(err);
        }

        const {
            contentItem: { title, seo, contentDate, updateDate, authors },
            publicRuntimeConfig: { absoluteBasePath },
        } = props;

        render(<Seo {...(props as SEOprops)} />, { container: document.head });

        const metas: Record<string, string> = {
            'og:title': getMetaContentByProperty('og:title'),
            'og:type': getMetaContentByProperty('og:type'),
            'og:image': getMetaContentByProperty('og:image'),
            'og:description': getMetaContentByProperty('og:description'),
            'article:published_time': getMetaContentByProperty(
                'article:published_time'
            ),
            'article:modified_time': getMetaContentByProperty(
                'article:modified_time'
            ),
            'article:author': getMetaContentByProperty('article:author'),
            author: getMetaContentByName('author'),
            description: getMetaContentByName('description'),
        };

        const expected_metas: Record<string, string> = {
            'og:title': `${title} | MongoDB`,
            'og:type': 'article',
            'og:image': seo.og_image.url,
            'og:description': seo.og_description,
            'article:published_time': contentDate,
            'article:modified_time': updateDate,
            'article:author': absoluteBasePath + authors[0].calculated_slug,
            author: authors[0].name,
            description: seo.meta_description,
        };

        for (const [property, content] of Object.entries(metas)) {
            expect(content).toEqual(expected_metas[property]);
        }
    });
});
