import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Videos visual regression testing',
    runPercy('/developer/videos', 'Videos', 'videos')
);
