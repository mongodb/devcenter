import React from 'react';
import { ComponentFactory } from './component-factory';
import { ArticleNode } from '../../interfaces/article-body-node';
import { GlobalStyledDocumentBody } from './styles';

export const DocumentBody = ({ content }: any) => {
    return (
        <GlobalStyledDocumentBody>
            {[content].map((child: ArticleNode, index: number) => (
                <ComponentFactory key={index} nodeData={child} />
            ))}
        </GlobalStyledDocumentBody>
    );
};
