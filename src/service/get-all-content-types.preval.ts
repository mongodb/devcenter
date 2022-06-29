import preval from 'next-plugin-preval';
import { getAllContentTypes } from './get-all-content-types';

async function getData() {
    const allContentTypes = await getAllContentTypes();
    return allContentTypes;
}

export default preval(getData());
