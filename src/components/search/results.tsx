import React from 'react';
import { ResultsProps } from './types';
import { dataStyles } from './styles';

import Card, { getCardProps } from '../card';

const Results: React.FunctionComponent<ResultsProps> = React.memo(
    ({ data, isLoading, hasError }) => {
        console.log('Results Rendering');
        return (
            <div sx={dataStyles}>
                {data &&
                    data.map(page =>
                        page.map(piece => (
                            <Card
                                key={piece.slug}
                                sx={{ width: '100%' }}
                                {...getCardProps(piece, 'list')}
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
