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
    return (
        <div
            // Need this because Safari/mobile browsers don't normally render the border radius on scroll containers without this.
            // https://stackoverflow.com/a/58283449
            sx={{
                '.CodeMirror-simplescroll': { isolation: 'isolate' },
            }}
        >
            <CodeSnippet height={height} language={language} code={value} />
        </div>
    );
};
