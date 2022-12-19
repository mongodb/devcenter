import { test } from '@playwright/test';
import { runPercy } from '../utils';

test(
    'Products visual regression testing',
    runPercy('/developer/products', 'Products')
);
