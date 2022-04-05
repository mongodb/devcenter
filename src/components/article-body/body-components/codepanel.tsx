import { CodePanel } from '@mdb/flora';
import { getFloraLanguage } from '../../../utils/get-flora-language';
import {
    getCodeHeight,
    getNumberOfLines,
} from '../../../utils/get-code-height';
import { LanguageModeType } from '@mdb/flora/dist/types/src/CodeSnippet/types';

type Snippet = {
    language: LanguageModeType;
    code: string;
    alias?: string;
};

type Tabs = {
    options?: any;
    children?: any;
};

type Tab = {
    type: string;
    value: string;
};

export const CodeTabs = ({ children }: any) => {
    const snippets: Snippet[] = [];
    let maxNumberOfLines = 0;
    children.map((tabs: Tabs) => {
        const { tabid } = tabs.options;
        tabs.children.map((tab: Tab) => {
            const { type, value } = tab;
            if (type === 'code') {
                const numberOfLines = getNumberOfLines(value);
                maxNumberOfLines = Math.max(numberOfLines, maxNumberOfLines);
                snippets.push({
                    language: getFloraLanguage(tabid.toLowerCase()),
                    code: value,
                    alias: tabid,
                });
            }
        });
    });
    return (
        snippets.length > 0 && (
            <CodePanel
                snippets={snippets}
                height={getCodeHeight(maxNumberOfLines)}
            />
        )
    );
};
