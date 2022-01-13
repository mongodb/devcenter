import styled from '@emotion/styled';
import { layer } from '../styled/theme';
import { UnifiedNav } from '@mdb/consistent-nav';

const UnifiedNavCustom = styled(UnifiedNav)`
    z-index: ${layer.superFront};
`;

export { UnifiedNavCustom };
