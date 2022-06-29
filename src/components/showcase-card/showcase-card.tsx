import { ELinkVariant, Link, TypographyScale } from '@mdb/flora';

import { ShowcaseCardProps } from './types';
import { showcaseCardWrapper } from './styles';
import { getURLPath } from '../../utils/format-url-path';

const ShowcaseCard: React.FunctionComponent<ShowcaseCardProps> = ({
    alignment,
    titleLink,
    description,
    image,
    cta,
    className,
    links,
    defaultLink,
    wholeCardHref,
}) => {
    const smallImage = !description && !cta && image;
    const imageDimensions = smallImage ? ['40px', null, '56px'] : '72px';
    const gap = smallImage ? ['inc40', null, null, null, 'inc50'] : 'inc50';
    const alignItems = alignment === 'center' ? 'center' : 'start';
    const cursor = wholeCardHref ? 'pointer' : 'default';
    return (
        <div
            sx={{ ...showcaseCardWrapper, alignItems, gap, cursor }}
            className={className}
        >
            {wholeCardHref && (
                <a
                    href={getURLPath(wholeCardHref)}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: 0,
                        top: 0,
                    }}
                />
            )}
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
                    href={getURLPath(titleLink.url)}
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
                    href={getURLPath(titleLink.url)}
                    linkIcon="chevron"
                    linkIconDisableExpand={true}
                >
                    {titleLink.text}
                </Link>
            )}
            {!!description && (
                <TypographyScale variant="body3">{description}</TypographyScale>
            )}
            {!!links && (
                <div>
                    {links.map(link => (
                        <Link key={link.text} href={getURLPath(link.url)}>
                            {link.text}
                        </Link>
                    ))}
                </div>
            )}
            {!!cta && (
                <Link
                    variant={ELinkVariant.SMALL}
                    href={getURLPath(cta.url)}
                    linkIcon="chevron"
                    linkIconDisableExpand={true}
                    sx={{ marginTop: 'auto' }}
                >
                    {cta.text}
                </Link>
            )}
        </div>
    );
};

export default ShowcaseCard;
