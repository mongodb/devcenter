import { CodePanel } from '@mdb/flora';
import { getFloraLanguage } from '../../../utils/get-flora-language';
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
    children.map((tabs: Tabs) => {
        const { tabid } = tabs.options;
        tabs.children.map((tab: Tab) => {
            const { type, value } = tab;
            if (type === 'code') {
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
            <CodePanel snippets={snippets} height="auto" lineWrapping={false} />
        )
    );
};
