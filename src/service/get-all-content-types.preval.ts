import preval from 'next-plugin-preval';
import { getAllContentTypes } from './get-all-content-types';
import '../../mocks/run-msw';

async function getData() {
    const allContentTypes = await getAllContentTypes();
    return allContentTypes;
}

export default preval(getData());
