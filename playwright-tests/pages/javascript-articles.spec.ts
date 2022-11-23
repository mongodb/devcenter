import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Topics visual regression testing',
    runPercy(
        '/developer/languages/javascript/articles',
        'JavaScript Articles',
        'javascript-articles'
    )
);
