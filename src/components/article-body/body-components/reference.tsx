import React from 'react';
import { ComponentFactory } from '../component-factory';
import { Link } from '@mdb/flora';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const Reference = ({
    children,
    url,
}: {
    children: any;
    url: string;
}) => {
    const isAnchor = url.startsWith('#');
    const targetType = isAnchor ? '_self' : '_blank';
    return (
        <Link sx={{ display: 'inline-block' }} href={url} target={targetType}>
            {children.map((child: ArticleNode, index: number) => (
                <ComponentFactory nodeData={child} key={index} />
            ))}
        </Link>
    );
};
