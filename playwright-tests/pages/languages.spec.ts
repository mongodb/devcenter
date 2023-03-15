import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Languages visual regression testing',
    runPercy('/developer/languages', 'Languages')
);
