import preval from 'next-plugin-preval';
import { Featured } from '../interfaces/featured';
import { getAllFeatured } from './get-all-featured';

export const getData = async (): Promise<Featured> => {
    const data = await getAllFeatured();
    return data;
};

export default preval(getData());
