import React from 'react';
import { ResultsProps } from './types';
import { dataStyles } from './styles';

import Card, { getCardProps } from '../card';

// This isn't working as desired. The child components are still rendering depspite this being memoized.
const Results: React.FunctionComponent<ResultsProps> = React.memo(
    ({ data, isLoading, hasError, layout = 'list' }) => {
        const extraCardStyles =
            layout === 'list' ? { width: '100%' } : { height: '100%' };
        return (
            <div data-testid="search-results" sx={dataStyles(layout)}>
                {data &&
                    data.map(page =>
                        page.map(piece => (
                            <Card
                                key={piece.slug}
                                sx={extraCardStyles}
                                {...getCardProps(
                                    piece,
                                    layout === 'list' ? 'list' : 'medium'
                                )}
                            />
                        ))
                    )}
                {isLoading ? (
                    <div>Loading...</div>
                ) : hasError ? (
                    <div>Something went wrong, please try again</div>
                ) : null}
            </div>
        );
    }
);

Results.displayName = 'Results';

export default Results;
