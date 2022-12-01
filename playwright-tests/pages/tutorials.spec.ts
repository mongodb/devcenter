import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Tutorials visual regression testing',
    runPercy('/developer/tutorials', 'Tutorials', 'tutorials')
);
