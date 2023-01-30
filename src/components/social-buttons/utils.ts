import { Author } from '../../interfaces/author';
import { Tag } from '../../interfaces/tag';

export const getTweetText = (
    authors: Author[] = [],
    heading = '',
    tags: Tag[] = []
): string => {
    const twitterTextElements: string[] = [heading, '#MongoDB'];

    const languages = tags.filter(tag => tag.type === 'ProgrammingLanguage');
    if (languages.length) {
        languages.forEach(({ name }) => {
            let languageTag: string | null = null;
            if (name === 'C++') {
                languageTag = 'cplusplus';
            } else if (name === 'C') {
                languageTag = 'clang';
            } else if (name === 'Swift') {
                languageTag = 'swiftlang';
            } else if (name === 'Go') {
                languageTag = 'golang';
            } else if (name === 'Rust') {
                languageTag = 'rustlang';
            } else if (name === 'C#') {
                languageTag = 'csharp';
            } // We will have to create special cases for new languages with specaial characters,
            //   so we disallow any other ones with special characters here.
            else if (name.match(/^[a-zA-Z0-9 ]+$/g)) {
                languageTag = name.toLowerCase().replace(' ', '_');
            }

            if (languageTag) {
                twitterTextElements.push(`#${languageTag}`);
            }
        });
    }

    if (authors.length) {
        const authorsWithUsernames = authors.filter(
            (
                { twitter } // Filter out authors' handles that just default to the MongoDB account.
            ) => twitter && !twitter.toLowerCase().endsWith('/mongodb')
        );

        if (authorsWithUsernames.length) {
            const authorTags = authorsWithUsernames
                .map(({ twitter }) => {
                    const splitUrl = twitter?.split('/') as string[];
                    const username = splitUrl[splitUrl?.length - 1];
                    return `@${username}`;
                })
                .join(' ');

            twitterTextElements.push('by');
            twitterTextElements.push(authorTags);
        }
    }

    return encodeURIComponent(twitterTextElements.join(' '));
};
