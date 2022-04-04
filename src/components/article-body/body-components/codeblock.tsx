import { CodeSnippet } from '@mdb/flora';
import { useMemo } from 'react';
import { LanguageModeType } from '@mdb/flora/dist/types/src/CodeSnippet/types';

type languageOptions = {
    [key: string]: LanguageModeType;
};
const SUPPORTED_LANGUAGES: languageOptions = {
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
const determineFloraLanguage = (inputLang: string): LanguageModeType => {
    let language = !!inputLang ? inputLang.toLowerCase() : 'none';
    if (Object.keys(SUPPORTED_LANGUAGES).includes(language)) {
        return SUPPORTED_LANGUAGES[language];
    } else {
        // Language is not supported formally by Flora, set to none to avoid errors
        const warningMessage = `Warning: Language ${language} is not supported. Defaulting to "node"`;
        console.warn(warningMessage);
        return SUPPORTED_LANGUAGES['node'];
    }
};

export const CodeBlock = ({ lang, value }: { lang: string; value: string }) => {
    const numLines = useMemo(() => value.split(/\r|\n/).length, [value]);
    const height =
        numLines <= 8
            ? 'small'
            : numLines > 8 && numLines <= 12
            ? 'medium'
            : 'large';
    const language = determineFloraLanguage(lang);
    return <CodeSnippet height={height} language={language} code={value} />;
};
