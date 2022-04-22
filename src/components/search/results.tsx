import React from 'react';
import Image from 'next/image';

import { ResultsProps } from './types';
import { dataStyles } from './styles';

import Card, { getCardProps } from '../card';

import loadingAnimation from '../../../public/loading-animation.gif';

// TODO: This isn't being memoized correctly.
const Results: React.FunctionComponent<ResultsProps> = React.memo(
    ({ data, isLoading, hasError }) => {
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
                    <Image alt="Loading..." src={loadingAnimation}></Image>
                ) : hasError ? (
                    <div>Something went wrong, please try again</div>
                ) : null}
            </div>
        );
    }
);

Results.displayName = 'Results';

export default Results;
