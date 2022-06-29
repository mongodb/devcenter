import { PageParams } from '../interfaces/page-params';
import { PageType } from './page-type';

export type DynamicPageType = {
    pageType: PageType;
    pageParams: PageParams;
};
