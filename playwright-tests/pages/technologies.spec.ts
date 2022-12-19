import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Technologies visual regression testing',
    runPercy('/developer/technologies', 'Technologies')
);
