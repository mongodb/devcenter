import { CodeSnippet } from '@mdb/flora';
import { useMemo } from 'react';

const SUPPORTED_LANGUAGES = {
    c: 'C',
    css: 'CSS',
    cs: 'C#',
    'c++': 'C++',
    golang: 'Go',
    go: 'Go',
    html: 'HTML',
    toml: 'HTML',
    java: 'Java',
    js: 'JavaScript',
    javascript: 'JavaScript',
    json: 'JSON',
    kotlin: 'Kotlin',
    markdown: 'Markdown',
    mql: 'MQL',
    node: 'Node',
    php: 'PHP',
    python: 'Python',
    react: 'React',
    reactnative: 'React Native',
    ruby: 'Ruby',
    rust: 'Rust',
    sh: 'Shell',
    swift: 'Swift',
    typescript: 'TypeScript',
    ts: 'TypeScript',
};
const determineFloraLanguage = (inputLang: string) => {
    let language = !!inputLang ? inputLang.toLowerCase() : 'none';
    if (Object.keys(SUPPORTED_LANGUAGES).includes(language)) {
        language = SUPPORTED_LANGUAGES[language];
    } else {
        // Language is not supported formally by Flora, set to none to avoid errors
        const warningMessage = `Warning: Language ${language} is not supported. Defaulting to "none"`;
        console.warn(warningMessage);
        language = 'none';
    }
    return language;
};

export const CodeBlock = ({ lang, value }) => {
    const numLines = useMemo(() => value.split(/\r|\n/).length, [value]);
    const height =
        numLines <= 8
            ? 'small'
            : numLines > 8 && numLines <= 12
            ? 'medium'
            : 'large';
    const language = determineFloraLanguage(lang);
    return language === 'none' ? (
        <CodeSnippet code={value} height={height} />
    ) : (
        <CodeSnippet height={height} language={language} code={value} />
    );
};
