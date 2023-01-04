import { act, fireEvent, render, screen } from '@testing-library/react';

import SocialButtons from '.';
import { getTweetText } from './utils';

// declare global navigator obj to be able to reference it in tests
Object.assign(navigator, {
    clipboard: {
        writeText: () => null,
    },
});

describe('Social Share Buttons', () => {
    it('renders the buttons', () => {
        render(
            <SocialButtons
                copyUrl="http://www.somesite.com"
                facebook={{
                    url: `https://www.facebook.com`,
                    title: 'Share on Facebook',
                }}
                twitter={{
                    url: `https://twitter.com`,
                    title: 'Share on Twitter',
                }}
                linkedIn={{
                    url: `https://www.linkedin.com`,
                    title: 'Share on LinkedIn',
                }}
            />
        );

        const container = screen.getByLabelText('share-buttons-container');
        expect(container.children.length).toEqual(4);
    });

    it('will not render an icon if a url is not provided', () => {
        render(
            <SocialButtons
                twitter={{
                    url: `https://twitter.com`,
                    title: 'Share on Twitter',
                }}
                linkedIn={{
                    url: `https://www.linkedin.com`,
                    title: 'Share on LinkedIn',
                }}
            />
        );

        const container = screen.getByLabelText('share-buttons-container');
        expect(container.children.length).toEqual(2);
    });

    it('should copy current page url and display tooltip', () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout');
        jest.spyOn(navigator.clipboard, 'writeText');

        const copyUrl = 'http://www.examplesite.com';

        render(<SocialButtons copyUrl={copyUrl} />);

        act(() => {
            fireEvent.click(screen.getByTitle('Copy link'));
        });

        const tooltip = screen.getByText('Link Copied!');

        expect(tooltip).toBeInTheDocument();
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copyUrl);

        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);

        // let setTimeout run and assert tooltip should no longer be showing
        act(() => {
            jest.runAllTimers();
        });

        expect(tooltip).not.toBeInTheDocument();
    });

    it('formats tweet body', () => {
        expect(
            getTweetText(
                [
                    {
                        name: 'Author 1',
                        calculated_slug: '/author/author-1',
                        twitter: 'https://twitter.com/someAuthor',
                    },
                ],
                'A Test Heading',
                [
                    {
                        name: 'Python',
                        slug: '/languages/python/',
                        type: 'ProgrammingLanguage',
                    },
                ]
            )
        ).toEqual(
            'A%20Test%20Heading%20%23MongoDB%20%23python%20by%20%40someAuthor'
        );

        // assert one more case to make sure languageTag mapping in getTweetText func works as expected
        expect(
            getTweetText([], '', [
                {
                    name: 'C++',
                    slug: '/languages/cpp/',
                    type: 'ProgrammingLanguage',
                },
                {
                    name: 'C',
                    slug: '/languages/c/',
                    type: 'ProgrammingLanguage',
                },
                {
                    name: 'Swift',
                    slug: '/languages/swift/',
                    type: 'ProgrammingLanguage',
                },
                {
                    name: 'Go',
                    slug: '/languages/go/',
                    type: 'ProgrammingLanguage',
                },
                {
                    name: 'Rust',
                    slug: '/languages/rust/',
                    type: 'ProgrammingLanguage',
                },
                {
                    name: 'C#',
                    slug: '/languages/csharp/',
                    type: 'ProgrammingLanguage',
                },
            ])
        ).toEqual(
            '%20%23MongoDB%20%23cplusplus%20%23clang%20%23swiftlang%20%23golang%20%23rustlang%20%23csharp'
        );
    });
});
