import { l1Products } from './l1-products';
import { l2Products } from './l2-products';
import { languages } from './languages';
import { technologies } from './technologies';
import { Taxonomy } from '../interfaces/taxonomy';

export const taxonomyData = new Map<string, Taxonomy[]>([
    ['l1Products', l1Products],
    ['l2Products', l2Products],
    ['languages', languages],
    ['technologies', technologies],
]);
