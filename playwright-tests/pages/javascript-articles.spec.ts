import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'JavaScript Articles topic visual regression testing',
    runPercy('/developer/languages/javascript/articles', 'JavaScript Articles')
);
