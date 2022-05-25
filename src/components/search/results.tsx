import React from 'react';
import Image from 'next/image';

import { ResultsProps } from './types';
import { dataStyles } from './styles';

import Card, { getCardProps } from '../card';

import { getURLPath } from '../../utils/format-url-path';

// TODO: This isn't being memoized correctly.
const Results: React.FunctionComponent<ResultsProps> = React.memo(
    ({ data, isLoading, hasError, layout = 'list' }) => {
        const extraCardStyles =
            layout === 'list' ? { width: '100%' } : { height: '100%' };
        return (
            <div
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                {data && (
                    <div data-testid="search-results" sx={dataStyles(layout)}>
                        {data.map(item => (
                            <Card
                                key={item.slug}
                                sx={extraCardStyles}
                                {...getCardProps(
                                    item,
                                    layout === 'list' ? 'list' : 'medium'
                                )}
                            />
                        ))}
                    </div>
                )}
                {isLoading ? (
                    <Image
                        sx={{ display: isLoading ? 'block' : 'hidden' }}
                        alt="Loading..."
                        width={116}
                        height={116}
                        src={getURLPath('/loading-animation.gif') as string}
                    ></Image>
                ) : hasError ? (
                    <div>Something went wrong, please try again</div>
                ) : null}
            </div>
        );
    }
);

Results.displayName = 'Results';

export default Results;
