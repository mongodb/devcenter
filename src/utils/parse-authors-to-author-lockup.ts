import { Author } from '../interfaces/author';
import { AuthorLockUp } from '../components/author-lockup/types';

export const parseAuthorsToAuthorLockup = (
    authors: Author[] | undefined
): AuthorLockUp[] => {
    const authorLockup: AuthorLockUp[] = [];
    if (authors) {
        authors.forEach(a => {
            authorLockup.push({
                name: a.name,
                image: {
                    src: a.image?.url,
                },
                url: a.calculated_slug,
            });
        });
    }
    return authorLockup;
};
