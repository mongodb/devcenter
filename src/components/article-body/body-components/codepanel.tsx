import { CodePanel } from '@mdb/flora';
import { getFloraLanguage } from '../../../utils/get-flora-language';
import { LanguageModeType } from '@mdb/flora/dist/types/src/CodeSnippet/types';
import { useCallback, useEffect, useReducer, useRef } from 'react';

type Snippet = {
    language: LanguageModeType;
    code: string;
    alias?: string;
};

type Tab = {
    type: string;
    value?: string;
    lang?: string;
};

export const CodeTabs = ({ children }: any) => {
    // This is a workaround to a bug where a long line of code will be cut off at the end.
    // This seems to be a CodeMirror issue, but is especially apparent here without line wrapping.
    // https://github.com/codemirror/codemirror5/issues/5639 describes a similar issue.

    // We're utilizing the Intersection Observer API (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
    // to force the component to rerender when the Code Block element comes into the viewport.

    const [, forceUpdate] = useReducer(x => x + 1, 0); // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const wrapper = useRef<HTMLDivElement>(null);

    const onVisible = useCallback(
        (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver
        ) => {
            // When this gets called with the element intersecting the viewport, we rerender and disconnect the observer.
            // We are only ever registering 1 element to the observer, so we can disconnnect whenever this gets called with an entry.
            if (entries.length && entries[0].isIntersecting) {
                forceUpdate();
                observer.disconnect();
            }
        },
        []
    );

    useEffect(() => {
        let observer: IntersectionObserver;
        if (wrapper.current) {
            // Set up the observer to execute the onVisible callback when 1% of the block is in the viewport.
            observer = new IntersectionObserver(onVisible, {
                threshold: 0.01,
            });
            observer.observe(wrapper.current);
        }

        return () => {
            // Clean up and disconnect, needed if the user hasn't scrolled the code block into view.
            if (observer) {
                observer.disconnect();
            }
        };
    }, [wrapper]);

    const snippets: Snippet[] = [];
    children.map((tab: Tab) => {
        const { type, value } = tab;
        if (type === 'code' && value) {
            const { lang } = tab;
            snippets.push({
                language: getFloraLanguage(lang ? lang.toLowerCase() : ''),
                code: value,
            });
        }
    });
    return (
        snippets.length > 0 && (
            <div
                sx={{
                    '.CodeMirror-simplescroll': { isolation: 'isolate' },
                    '.CodeMirror-simplescroll-horizontal div': {
                        background: '#e7eeec',
                    },
                }}
                ref={wrapper}
            >
                <CodePanel
                    snippets={snippets}
                    height="auto"
                    lineWrapping={false}
                />
            </div>
        )
    );
};
