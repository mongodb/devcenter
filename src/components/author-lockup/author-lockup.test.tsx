import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import AuthorLockup from '.';
import { initial } from 'cypress/types/lodash';

const authorWithImage = {
    name: 'Image Author',
    url: 'https://www.google.com/',
    image: { src: 'https://i.pravatar.cc/200', alt: 'Image Author' },
};

const authorWithoutImage = {
    name: 'Other Author',
    url: 'https://github.com/',
};

test('renders author with image', () => {
    render(<AuthorLockup authors={[authorWithImage]} />);

    const image = screen.getByAltText(authorWithImage.image.alt);
    expect(image).toHaveAttribute('src', authorWithImage.image.src);
    expect(image).toHaveStyle({ height: '40px', width: '40px' });

    const name = screen.getByText(authorWithImage.name);
    expect(name.parentElement).toHaveStyle({ 'font-size': '14px' });
});

test('renders author without image', () => {
    render(<AuthorLockup authors={[authorWithoutImage]} />);

    const image = screen.getByText('OA');
    expect(image).toHaveStyle({ 'font-size': '12px' });
    expect(image.parentElement).toHaveStyle({ height: '40px', width: '40px' });
});

test('renders author with clickable links', () => {
    render(<AuthorLockup authors={[authorWithoutImage]} clickableLinks />);

    const name = screen.getByText(authorWithoutImage.name);
    expect(name).toHaveAttribute('href', authorWithoutImage.url);
});

test('renders author with title', () => {
    render(<AuthorLockup authors={[authorWithoutImage]} title="Some Title" />);

    const title = screen.getByText('Some Title');
    expect(title).toHaveStyle({ 'font-size': '14px' });
});

test('renders author and title', () => {
    render(<AuthorLockup authors={[authorWithoutImage]} title="Some Title" />);

    const title = screen.getByText('Some Title');
    expect(title).toHaveStyle({ 'font-size': '14px' });
});

test('renders large version', () => {
    render(
        <AuthorLockup
            authors={[authorWithImage]}
            title="Some Title"
            size="large"
        />
    );

    const image = screen.getByAltText(authorWithImage.image.alt);
    expect(image).toHaveStyle({ height: '40px', width: '40px' });

    const name = screen.getByText(authorWithImage.name);
    expect(name.parentElement).toHaveStyle({ 'font-size': '18px' });

    const title = screen.getByText('Some Title');
    expect(title).toHaveStyle({ 'font-size': '14px' });
});

test('renders multiple authors with collapsed names', () => {
    render(<AuthorLockup authors={[authorWithImage, authorWithoutImage]} />);
    const names = screen.getByText((content, element) => {
        return (
            content === authorWithImage.name &&
            element?.nextSibling?.textContent === ' (+1)'
        );
    });
    expect(names).toBeInTheDocument();

    const image = screen.getByAltText(authorWithImage.image.alt);
    expect(image).toBeInTheDocument();

    const initials = screen.getByText('OA');
    expect(initials).toBeInTheDocument();
});

test('renders multiple authors with expanded names', () => {
    render(
        <AuthorLockup
            authors={[authorWithImage, authorWithoutImage]}
            expandedNames
        />
    );
    const names = screen.getByText((content, element) => {
        return (
            content === `${authorWithImage.name},` &&
            element?.nextSibling?.textContent === authorWithoutImage.name
        );
    });
    expect(names).toBeInTheDocument();
});
