import Image from 'next/image';
import { TypographyScale } from '@mdb/flora';

import { avatarPlaceholder, profileImage } from './styles';
import { getInitials } from './utils';
import { AuthorImageProps } from './types';
import { getURLPath } from '../../utils/format-url-path';

const AuthorImage: React.FunctionComponent<AuthorImageProps> = ({
    author,
    className,
    size,
}) => {
    const { image, name } = author;
    if (!image || !image.src) {
        return (
            <div className={className} sx={avatarPlaceholder(size)}>
                <TypographyScale
                    inverse
                    customStyles={{
                        fontWeight:
                            size === 'small' ? 400 : [400, null, null, 500],
                        fontSize:
                            size === 'small'
                                ? '12px'
                                : ['16px', null, null, '24px'],
                    }}
                >
                    {getInitials(name)}
                </TypographyScale>
            </div>
        );
    }
    const { src, alt } = image;
    return (
        <div sx={profileImage(size)} className={className}>
            <Image
                sx={profileImage(size)}
                layout="fill"
                src={getURLPath(src) as string}
                alt={alt || ''}
            />
        </div>
    );
};

export default AuthorImage;
