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

    // Need this because Safari/mobile browsers don't normally render the border radius on scroll containers without this.
    // https://stackoverflow.com/a/58283449
    const styling = {
        '.CodeMirror-simplescroll': { isolation: 'isolate' as const },
    };
    return (
        <div sx={styling}>
            <CodeSnippet height={height} language={language} code={value} />
        </div>
    );
};
