import preval from 'next-plugin-preval';
import { getAllMetaInfo } from './get-all-meta-info';
import '../../mocks/run-msw';

async function getData() {
    const allMetaInfo = await getAllMetaInfo();
    return allMetaInfo;
}

export default preval(getData());
