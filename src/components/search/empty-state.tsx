import Image from 'next/image';

import { getURLPath } from '../../utils/format-url-path';
import { thumbnailLoader } from '../card/utils';
import { TypographyScale } from '@mdb/flora';

const EmptyState: React.FunctionComponent = () => (
    <div
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <div>
            <Image
                src={getURLPath('/no-results.png') as string}
                loader={thumbnailLoader}
                alt="No Results"
                height={500}
                width={500}
            />
        </div>
        <TypographyScale>No Results</TypographyScale>
    </div>
);

export default EmptyState;
