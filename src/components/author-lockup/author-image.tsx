import { TypographyScale } from '@mdb/flora';

import { avatarPlaceholder, profileImage } from './styles';
import { getInitials } from './utils';
import { AuthorImageProps } from './types';

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
            <img
                sx={profileImage(size)}
                src={src}
                alt={alt || ''}
            />
        </div>
    );
};

export default AuthorImage;
