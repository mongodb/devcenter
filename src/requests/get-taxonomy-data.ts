import { l1Products } from '../data/l1-products';
import { l2Products } from '../data/l2-products';
import { languages } from '../data/languages';
import { technologies } from '../data/technologies';

const getTaxonomyData = (slug: string) => {
    const taxonomyData = l1Products.concat(l2Products, languages, technologies);
    return taxonomyData.find(p => p.slug === slug);
};

export default getTaxonomyData;
