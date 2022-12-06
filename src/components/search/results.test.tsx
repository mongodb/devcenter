import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './results';
import { ContentItem } from '../../interfaces/content-item';

const mockData: ContentItem[] = [
    {
        title: 'Some Title',
        description: 'description',
        slug: '/slug',
        authors: [],
        image: {
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/sql_mdb_5defc2e338.png?w=3840&q=90',
        },
        category: 'Article',
        contentDate: 'May 01 2022',
        tags: [],
        featured: false,
    },
];
jest.mock('../../../public/loading-animation.gif', () => {
    return {
        default: { src: '/loading-animation.gif', height: 112, width: 112 },
    };
});

const Results = ({ results, ...rest }: any) => (
    <SearchResults
        results={results}
        isValidating={false}
        error={false}
        layout="grid"
        searchString=""
        slug="/test"
        filters={[]}
        pageNumber={1}
        contentType="Test"
        {...rest}
    />
);

describe('Search Results', () => {
    test('renders default results', () => {
        render(<Results results={mockData} />);

        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'grid' });
    });
    test('renders grid results', () => {
        render(<Results results={mockData} />);

        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'grid' });
    });
    test('renders loading spinner', () => {
        render(<Results results={undefined} isValidating />);

        const spinner = screen.getByAltText('Loadingabc...');
        expect(spinner).toBeInTheDocument();
    });
    test('renders error message', () => {
        render(<Results results={undefined} error={true} />);

        const error = screen.getByText(
            'Something went wrong, please try again'
        );
        expect(error).toBeInTheDocument();
    });
});
