import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Quickstarts visual regression testing',
    runPercy('/developer/quickstarts', 'Quickstarts', 'quickstarts')
);
