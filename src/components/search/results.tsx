import { memo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mdb/flora';

import { ResultsProps } from './types';
import { dataStyles } from './styles';

import Card, { getCardProps } from '../card';

import { getURLPath } from '../../utils/format-url-path';
import { DEFAULT_PAGE_SIZE } from './utils';

// TODO: This isn't being memoized correctly.
const Results: React.FunctionComponent<ResultsProps> = memo(
    ({ results, isValidating, error, layout = 'list', extraStyles = {} }) => {
        const [resultsToShow, setResultsToShow] = useState(DEFAULT_PAGE_SIZE);

        const showLoadMoreButton = true;
        const loadMoreHref = '#';
        const onLoadMore = () => {};

        const extraCardStyles =
            layout === 'list' ? { width: '100%' } : { height: '100%' };

        return (
            <div
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    ...extraStyles,
                }}
            >
                {results && (
                    // Needs to be wrapped in a div because Safari isn't the best with grid...
                    // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
                    <div>
                        <div
                            data-testid="search-results"
                            sx={dataStyles(layout)}
                        >
                            {results.map(item => (
                                <Card
                                    key={item.slug}
                                    sx={extraCardStyles}
                                    hideTagsOnMobile={layout === 'list'}
                                    {...getCardProps(
                                        item,
                                        layout === 'list' ? 'list' : 'medium'
                                    )}
                                />
                            ))}
                        </div>

                        {showLoadMoreButton && (
                            <div
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: ['inc70', null, 'inc90'],
                                }}
                            >
                                {!isValidating && results && (
                                    <a href={loadMoreHref} onClick={onLoadMore}>
                                        <Button variant="secondary">
                                            Load more
                                        </Button>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {isValidating ? (
                    <Image
                        alt="Loading..."
                        width={116}
                        height={116}
                        src={
                            getURLPath(
                                '/loading-animation.gif',
                                false
                            ) as string
                        }
                    />
                ) : error ? (
                    <div>Something went wrong, please try again</div>
                ) : null}
            </div>
        );
    }
);

Results.displayName = 'Results';

export default Results;
