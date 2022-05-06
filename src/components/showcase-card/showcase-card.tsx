import { Link } from '@mdb/flora';

import { ShowcaseCardProps } from './types';
import { showcaseCardWrapper } from './styles';

const ShowcaseCard: React.FunctionComponent<ShowcaseCardProps> = ({
    alignment,
    titleLink,
    description,
    image,
    cta,
    className,
}) => {
    const smallImage = !description && !cta && image;
    const imageDimensions = smallImage ? ['40px', null, '56px'] : '72px';
    const imagePaddingBottom = smallImage
        ? ['inc40', null, null, null, 'inc50']
        : 'inc50';
    const alignItems = alignment === 'center' ? 'center' : 'start';
    return (
        <div sx={{ ...showcaseCardWrapper, alignItems }} className={className}>
            {image && (
                <div
                    sx={{
                        img: {
                            width: imageDimensions,
                            height: imageDimensions,
                        },
                        paddingBottom: imagePaddingBottom,
                    }}
                >
                    {image}
                </div>
            )}
            <Link
                href={titleLink.url}
                linkIcon="chevron"
                linkIconDisableExpand={true}
            >
                {titleLink.text}
            </Link>
        </div>
    );
};

export default ShowcaseCard;
