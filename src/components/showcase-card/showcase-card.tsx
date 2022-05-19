import { ELinkVariant, Link, TypographyScale } from '@mdb/flora';

import { ShowcaseCardProps } from './types';
import { showcaseCardWrapper } from './styles';

const ShowcaseCard: React.FunctionComponent<ShowcaseCardProps> = ({
    alignment,
    titleLink,
    description,
    image,
    cta,
    className,
    links,
    defaultLink,
}) => {
    const smallImage = !description && !cta && image;
    const imageDimensions = smallImage ? ['40px', null, '56px'] : '72px';
    const gap = smallImage ? ['inc40', null, null, null, 'inc50'] : 'inc50';
    const alignItems = alignment === 'center' ? 'center' : 'start';
    return (
        <div
            sx={{ ...showcaseCardWrapper, alignItems, gap }}
            className={className}
        >
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
            {defaultLink ? (
                <Link
                    href={titleLink.url}
                    sx={{
                        '.textlink-default-text-class': {
                            '&:hover': {
                                borderBottom: '2px solid transparent;',
                            },
                            color: '#001E2B!important',
                        },
                    }}
                >
                    {titleLink.text}
                </Link>
            ) : (
                <Link
                    href={titleLink.url}
                    linkIcon="chevron"
                    linkIconDisableExpand={true}
                >
                    {titleLink.text}
                </Link>
            )}
            {!!description && <TypographyScale>{description}</TypographyScale>}
            {!!links && (
                <div>
                    {links.map(link => (
                        <Link key={link.text} href={link.url}>
                            {link.text}
                        </Link>
                    ))}
                </div>
            )}
            {!!cta && (
                <Link
                    variant={ELinkVariant.SMALL}
                    href={cta.url}
                    linkIcon="chevron"
                    linkIconDisableExpand={true}
                >
                    {cta.text}
                </Link>
            )}
        </div>
    );
};

export default ShowcaseCard;
