import preval from 'next-plugin-preval';
import { getAllContentTypes } from './get-all-content-types';
import { runMSW } from '../../mocks/run-msw';

async function getData() {
    await runMSW();
    const allContentTypes = await getAllContentTypes();
    return allContentTypes;
}

export default preval(getData());
