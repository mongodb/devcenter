import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'JavaScript topic visual regression testing',
    runPercy('/developer/languages/javascript', 'Javascript')
);
