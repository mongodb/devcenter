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
    const smallImage = !description && !titleLink && !cta && image;
    const imageDimensions = !image
        ? null
        : smallImage
        ? ['40px', null, '56px']
        : '72px';
    return (
        <div sx={showcaseCardWrapper(alignment)} className={className}>
            {image && (
                <div
                    sx={{
                        img: {
                            width: imageDimensions,
                            height: imageDimensions,
                        },
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
