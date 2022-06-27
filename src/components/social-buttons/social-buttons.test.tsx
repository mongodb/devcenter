import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SocialButtons from '.';

test('renders social buttons with all social', () => {
    render(
        <SocialButtons
            heading="Some Heading"
            authors={[
                {
                    name: 'Author 1',
                    calculated_slug: '/author/author-1',
                    twitter: 'https://twitter.com/someAuthor',
                },
            ]}
            tags={[
                {
                    name: 'Python',
                    slug: '/languages/python/',
                    type: 'ProgrammingLanguage',
                },
            ]}
            description=""
        />
    );

    expect(screen.getByAltText('facebook icon')).toBeDefined();

    const twitterIcon = screen.getByAltText('twitter icon');
    expect(twitterIcon).toBeDefined();
    const twitterLink = twitterIcon.parentElement?.getAttribute('href');
    expect(twitterLink?.includes('%23MongoDB'));
    expect(twitterLink?.includes('%23python'));
    expect(twitterLink?.includes('%40someAuthor'));

    const linkedInIcon = screen.getByAltText('linkedin icon');
    expect(linkedInIcon).toBeDefined();
    const linkedinLink = linkedInIcon.parentElement?.getAttribute('href');
    expect(linkedinLink?.includes('Some%20Heading'));
});
