import preval from 'next-plugin-preval';
import { getAllMetaInfo } from './get-all-meta-info';

// Fisher–Yates shuffle
const shuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
};

async function getData() {
    const allMetaInfo = await getAllMetaInfo();

    shuffle(allMetaInfo);

    return allMetaInfo;
}

export default preval(getData());
