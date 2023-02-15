import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Search visual regression testing',
    runPercy('/developer/search', 'Search')
);
