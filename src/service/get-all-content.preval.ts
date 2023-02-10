import preval from 'next-plugin-preval';
import { getAllContentItems } from './get-all-content';
import { runMSW } from '../../mocks/run-msw';

async function getData() {
    await runMSW();
    return await getAllContentItems();
}

export default preval(getData());
