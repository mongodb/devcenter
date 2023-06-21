import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { initializeContentStackSdk } from './stack';

const Stack = initializeContentStackSdk();

ContentstackLivePreview.init({
    stackSdk: Stack,
})?.catch(err => console.error(err));

export const { onEntryChange } = ContentstackLivePreview;
