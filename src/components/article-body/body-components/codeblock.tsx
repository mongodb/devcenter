import { CodeSnippet } from '@mdb/flora';
import { getFloraLanguage } from '../../../utils/get-flora-language';
import {
    getCodeHeight,
    getNumberOfLines,
} from '../../../utils/get-code-height';

export const CodeBlock = ({ lang, value }: { lang: string; value: string }) => {
    const numberOfLines = getNumberOfLines(value);
    const height = getCodeHeight(numberOfLines);
    const language = getFloraLanguage(lang);
    return <CodeSnippet height={height} language={language} code={value} />;
};
