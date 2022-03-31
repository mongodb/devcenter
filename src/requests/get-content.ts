import { ContentPiece } from '../interfaces/content-piece';
import getL1Content from './get-l1-content';

const getContent = (slug: string): ContentPiece =>
    getL1Content().content.filter(piece => piece.slug === slug)[0];

export default getContent;
