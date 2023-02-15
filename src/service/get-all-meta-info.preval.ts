import preval from 'next-plugin-preval';
import { getAllMetaInfo } from './get-all-meta-info';
import { runMSW } from '../../mocks/run-msw';

async function getData() {
    await runMSW();
    const allMetaInfo = await getAllMetaInfo();
    return allMetaInfo;
}

export default preval(getData());
