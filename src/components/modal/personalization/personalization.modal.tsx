import { useState } from 'react';
import { Pagination } from '@mdb/flora';

import { modalWrapperStyles } from '../shared/styles';

// TODO: Temporary until Tags are tied in from pre-val
const paginationConfig = [
    {
        title: 'Languages',
        tags: ['JavaScript', 'Swift', 'Dart'],
    },
    {
        title: 'Technologies',
        tags: ['Dockers', 'Kubernetes', 'AWS'],
    },
    {
        title: 'Products',
        tags: ['MongoDB', 'Cloud Manager', 'Data Federation'],
    },
];

const PersonalizationModal = ({ hasPagination = true }) => {
    const [pageIndex, setPageIndex] = useState(1);

    const onPaginationChange = (newIndex: number) => {
        console.log('onPaginationChange was called', newIndex);
        setPageIndex(newIndex);
    };

    console.log('hello', paginationConfig[pageIndex]);

    return (
        <div sx={modalWrapperStyles}>
            <h1>{paginationConfig[pageIndex]?.title}</h1>
            {paginationConfig[pageIndex]?.tags.map(tag => {
                return <button key={tag}>{tag}</button>;
            })}
            {hasPagination && (
                <Pagination
                    type="dots"
                    currentPage={pageIndex}
                    pages={paginationConfig.length}
                    onChangePage={onPaginationChange}
                />
            )}
        </div>
    );
};

export default PersonalizationModal;
