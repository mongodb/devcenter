import preval from 'next-plugin-preval';
import { getAllAuthors } from './get-all-authors';

async function getData() {
    const allAuthors = await getAllAuthors();
    return allAuthors;
}

export default preval(getData());
