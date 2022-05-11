import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from './results';
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

describe('Search Results', () => {
    test('renders default results', () => {
        render(<Results data={mockData} isLoading={false} hasError={false} />);

        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'flex' });
    });
    test('renders grid results', () => {
        render(
            <Results
                data={mockData}
                isLoading={false}
                hasError={false}
                layout="grid"
            />
        );

        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'grid' });
    });
    test('renders loading spinner', () => {
        render(<Results data={undefined} isLoading={true} hasError={false} />);

        const spinner = screen.getByAltText('Loading...');
        expect(spinner).toBeInTheDocument();
    });
    test('renders error message', () => {
        render(<Results data={undefined} isLoading={false} hasError={true} />);

        const error = screen.getByText(
            'Something went wrong, please try again'
        );
        expect(error).toBeInTheDocument();
    });
});
