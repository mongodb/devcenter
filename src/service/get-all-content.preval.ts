import preval from 'next-plugin-preval';
import { mockResults } from '../mockdata/mock-events-data';
import { getAllContentItems } from './get-all-content';

async function getData() {
    const allContent = await getAllContentItems();
    return [...allContent, ...mockResults];
}

export default preval(getData());
