import preval from 'next-plugin-preval';
import { CS_getAllAuthors } from './get-all-authors';
import { runMSW } from '../../mocks/run-msw';

async function getData() {
    await runMSW();
    const allAuthors = await CS_getAllAuthors();
    return allAuthors;
}

export default preval(getData());
