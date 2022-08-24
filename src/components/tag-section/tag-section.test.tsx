import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TagSection from '.';
import { Tag } from '../../interfaces/tag';

const tags: Tag[] = [
    { name: 'Python', type: 'ProgrammingLanguage', slug: '/languages/python/' },
    { name: 'Atlas', type: 'L1Product', slug: '/products/atlas/' },
    { name: 'Article', type: 'ContentType', slug: '/articles/' },
];

describe('Tag Section', () => {
    it('renders default tag section', () => {
        render(<TagSection tags={tags} />);

        const pythonTag = screen.getByText('Python');
        expect(pythonTag).toHaveAttribute(
            'href',
            '/developer/languages/python/'
        );

        const atlasTag = screen.getByText('Atlas');
        expect(atlasTag).toHaveAttribute('href', '/developer/products/atlas/');

        // Content type shouldn't show up.
        expect(screen.queryByText('Article')).toBeNull();
    });

    it('renders tag section with labels', () => {
        render(
            <TagSection
                withLabels
                tags={[
                    ...tags,
                    {
                        name: 'Realm',
                        type: 'L2Product',
                        slug: '/products/realm/',
                    },
                ]}
            />
        );

        const langLabel = screen.getByText('Languages');
        expect(langLabel).toBeInTheDocument();
        expect(langLabel.nextElementSibling?.childElementCount).toEqual(1); // count rendered tags under category label

        const productLabel = screen.getByText('Products');
        expect(productLabel).toBeInTheDocument();
        expect(productLabel.nextElementSibling?.childElementCount).toEqual(2); // L1Product and L2Product types should be grouped together under "Products"
    });
});
