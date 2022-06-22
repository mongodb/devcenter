import { queryByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TagSection from '.';
import { Tag } from '../../interfaces/tag';

const tags: Tag[] = [
    { name: 'Python', type: 'ProgrammingLanguage', slug: '/languages/python/' },
    { name: 'Atlas', type: 'L1Product', slug: '/products/atlas/' },
    { name: 'Article', type: 'ContentType', slug: '/articles/' },
];

test('renders tag section', () => {
    render(<TagSection tags={tags} />);

    const pythonTag = screen.getByText('Python');
    expect(pythonTag).toHaveAttribute('href', '/developer/languages/python/');

    const atlasTag = screen.getByText('Atlas');
    expect(atlasTag).toHaveAttribute('href', '/developer/products/atlas/');

    // Content type shouldn't show up.
    expect(screen.queryByText('Article')).toBeNull();
});
