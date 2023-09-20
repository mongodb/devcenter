import { useEffect, useRef, useReducer, useCallback } from 'react';
import { CodeSnippet } from '@mdb/flora';
import { getFloraLanguage } from '../../../utils/get-flora-language';

export const CodeBlock = ({ lang, value }: { lang: string; value: string }) => {
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

    const language = getFloraLanguage(lang);

    return (
        // Need this because Safari/mobile browsers don't normally render the border radius on scroll containers without this.
        // https://stackoverflow.com/a/58283449
        <div
            sx={{
                '.CodeMirror-simplescroll': { isolation: 'isolate' },
                '.CodeMirror-simplescroll-horizontal div': {
                    background: '#e7eeec',
                },
            }}
            ref={wrapper}
        >
            <CodeSnippet
                height="auto"
                language={language}
                code={value}
                lineWrapping={false}
            />
        </div>
    );
};
