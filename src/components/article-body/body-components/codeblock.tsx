import { useEffect, useState } from 'react';
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

    // This is a workaround to a bug where a long line of code will be cut off at the end.
    // This seems to be a CodeMirror issue, but is especially apparent here without line wrapping.
    // Basically this will force the component to rerender after 1 second, which allows it to recalculate the line length.
    // https://github.com/codemirror/codemirror5/issues/5639 describes a similar issue.
    const [_, setReady] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1000);
    }, []);

    // Need this because Safari/mobile browsers don't normally render the border radius on scroll containers without this.
    // https://stackoverflow.com/a/58283449
    const styling = {
        '.CodeMirror-simplescroll': { isolation: 'isolate' as 'isolate' },
    };
    return (
        <div sx={styling}>
            <CodeSnippet
                height={height}
                language={language}
                code={value}
                lineWrapping={false}
            />
        </div>
    );
};
