import preval from 'next-plugin-preval';
import { mockContent } from '../mockdata/mock-events-data';
import { getAllContentItems } from './get-all-content';

async function getData() {
    const allContent = await getAllContentItems();
    return [...allContent, ...mockContent];
}

export default preval(getData());
