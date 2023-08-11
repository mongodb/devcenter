import { test } from '@playwright/test';
import { runPercy } from '../utils';

//test
test(
    'Code Examples visual regression testing',
    runPercy('/developer/code-examples', 'Code Examples')
);
