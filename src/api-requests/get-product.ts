import { l1Products } from '../data/l1-products';

const getProduct = (slug: string) => {
    return l1Products.find(p => p.slug === slug);
};

export default getProduct;
