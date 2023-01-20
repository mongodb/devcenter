import preval from 'next-plugin-preval';
import { getAllContentItems } from './get-all-content';

async function getData() {
    return await getAllContentItems();
}

export default preval(getData());
