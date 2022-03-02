import { PillCategory } from '../../../types/pill-category';

export const thumbnailWrapperStyles = (category: PillCategory) => {
    // Video thumbnail have a 16:9 aspect ration instead of fixed dimensions.
    const videoAspectRatio =
        category === 'Video' ? { aspectRatio: '16 / 9' } : {};

    // Thumbnail dimensions vary by content type.
    let dimensions;

    switch (category) {
        case 'Article':
            dimensions = '64px';
            break;
        case 'Demo App':
            dimensions = '96px';
            break;
        case 'Podcast':
            dimensions = '48px';
            break;
        // case 'Quickstart':
        //     mobileDimensions = '64px';
        //     break;
        default:
            dimensions = null;
    }
    return {
        display: category === 'Tutorial' ? 'none' : 'block',
        flexShrink: 0,
        position: 'relative' as 'relative',
        ...videoAspectRatio,
        width: dimensions,
        height: dimensions,
    };
};

export const cardHeaderStyles = {
    display: 'flex',
    gap: ['inc30', null, 'inc50'],
    flexDirection: 'column' as 'column',
};
