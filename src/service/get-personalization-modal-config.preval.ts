import preval from 'next-plugin-preval';
import { getAllMetaInfo } from './get-all-meta-info';
import { initializePersonalizationConfig } from '../components/modal/personalization/utils';

async function getData() {
    const allMetaInfo = await getAllMetaInfo();
    return initializePersonalizationConfig(allMetaInfo);
}

export default preval(getData());
