import preval from 'next-plugin-preval';
import { getDistinctTags } from './get-distinct-tags';

async function getData() {
    const distinctTags = await getDistinctTags();
    return distinctTags;
}

export default preval(getData());
