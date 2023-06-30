import { getMetaInfoQuery } from '../graphql/meta-info';
import { ContentTypeUID, CS_MetaInfoResponse } from '../interfaces/meta-info';
import { fetchAll, getClient } from './contentstack_utils';

export const CS_getMetaInfoFromCMS = async (
    contentTypeID: ContentTypeUID
): Promise<CS_MetaInfoResponse[]> => {
    const client = getClient('production');
    const metaInfos = (await fetchAll(
        getMetaInfoQuery(contentTypeID),
        contentTypeID,
        client
    )) as CS_MetaInfoResponse[];

    return metaInfos;
};
