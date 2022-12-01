import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Podcasts visual regression testing',
    runPercy('/developer/podcasts', 'Podcasts', 'podcasts')
);
