import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import AuthorSocialButtons from '.';

const facebookUrl = 'https://www.facebook.com/';
const twitterUrl = 'https://www.twitter.com/';
const linkedinUrl = 'https://www.linkedin.com/';

test('renders author social buttons with all social', () => {
    render(
        <AuthorSocialButtons
            facebookUrl={facebookUrl}
            twitterUrl={twitterUrl}
            linkedinUrl={linkedinUrl}
        />
    );

    const fbIcon = screen.getByAltText('facebook icon');
    expect(fbIcon.parentElement).toHaveAttribute('href', facebookUrl);

    const twitterIcon = screen.getByAltText('twitter icon');
    expect(twitterIcon.parentElement).toHaveAttribute('href', twitterUrl);

    const linkedinIcon = screen.getByAltText('linkedin icon');
    expect(linkedinIcon.parentElement).toHaveAttribute('href', linkedinUrl);
});

test('renders author social buttons with some social', () => {
    render(
        <AuthorSocialButtons
            facebookUrl={facebookUrl}
            twitterUrl={twitterUrl}
        />
    );

    const fbIcon = screen.getByAltText('facebook icon');
    expect(fbIcon.parentElement).toHaveAttribute('href', facebookUrl);

    const twitterIcon = screen.getByAltText('twitter icon');
    expect(twitterIcon.parentElement).toHaveAttribute('href', twitterUrl);

    const linkedinIcon = screen.queryByAltText('linkedin icon');
    expect(linkedinIcon).toBeNull();
});
