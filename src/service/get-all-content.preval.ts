import preval from 'next-plugin-preval';
import { getAllContentItems } from './get-all-content';

async function getData() {
    const allContent = await getAllContentItems();
    return allContent;
}

export default preval(getData());
