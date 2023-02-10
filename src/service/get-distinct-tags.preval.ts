import preval from 'next-plugin-preval';
import { getDistinctTags } from './get-distinct-tags';
import { runMSW } from '../../mocks/run-msw';

async function getData() {
    await runMSW();
    const distinctTags = await getDistinctTags();
    return distinctTags;
}

export default preval(getData());
