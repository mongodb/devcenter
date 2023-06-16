import preval from 'next-plugin-preval';
import { getAllTags } from './get-all-tags';
import { runMSW } from '../../mocks/run-msw';

async function getData() {
    await runMSW();
    const allTags = await getAllTags();
    return allTags;
}

export default preval(getData());
