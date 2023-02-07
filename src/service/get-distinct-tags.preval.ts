import preval from 'next-plugin-preval';
import { getDistinctTags } from './get-distinct-tags';
import '../../mocks/run-msw';

async function getData() {
    const distinctTags = await getDistinctTags();
    return distinctTags;
}

export default preval(getData());
