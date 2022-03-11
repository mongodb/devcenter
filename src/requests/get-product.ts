import { products } from '../data/products';

const getProduct = (slug: string) => {
    return products.find(p => p.slug === slug);
};

export default getProduct;
