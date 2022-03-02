import { PillCategory } from '../../../types/pill-category';

export const thumbnailWrapperStyles = (
    category: PillCategory,
    listView: boolean
) => {
    // Tutorials don't have thumbnails in mobile.
    const mobileDisplay =
        listView || category !== 'Tutorial' ? 'block' : 'none';
    // Video thumbnail have a 16:9 aspect ration instead of fixed dimensions in mobile.
    const mobileAspectRatio =
        category === 'Video' ? { aspectRatio: '16 / 9' } : {};

    // Mobile thumbnail dimensions vary by content type.
    let mobileDimensions;
    if (listView) {
        mobileDimensions = '96px';
    } else {
        switch (category) {
            case 'Article':
                mobileDimensions = '64px';
                break;
            case 'Demo App':
                mobileDimensions = '96px';
                break;
            case 'Podcast':
                mobileDimensions = '48px';
                break;
            // case 'Quickstart':
            //     mobileDimensions = '64px';
            //     break;
            default:
                mobileDimensions = null;
        }
    }
    return {
        display: [mobileDisplay, null, 'block'],
        flexShrink: 0,
        position: 'relative' as 'relative',
        ...mobileAspectRatio,
        width: [mobileDimensions, null, '180px'],
        height: [mobileDimensions, null, '180px'],
    };
};

export const cardHeaderStyles = (listView: boolean) => {
    const mobileFlexDirection = listView
        ? ('row' as 'row')
        : ('column' as 'column');
    return {
        display: 'flex',
        gap: ['inc30', null, 'inc50'],
        flexDirection: [
            mobileFlexDirection,
            mobileFlexDirection,
            'row' as 'row',
        ],
    };
};

export const tagWrapperStyles = {
    display: ['none', null, 'flex'],
    gap: 'inc20',
    flexWrap: 'wrap' as 'wrap',
};

export const descriptionStyles = {
    display: ['none', null, 'block'],
    marginBottom: [null, null, 'inc50'],
    marginTop: [null, null, 'inc30'],
};

export const tagStyles = {
    display: ['none', null, 'block'],
    px: [null, null, null, 'inc30'],
    py: [null, null, null, 'inc20'],
    fontSize: [null, null, null, 'inc20'],
};
