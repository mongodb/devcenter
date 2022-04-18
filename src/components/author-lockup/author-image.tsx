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
            <div sx={avatarPlaceholder(size)} className={className}>
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
        <img
            sx={profileImage(size)}
            className={className}
            src={src}
            alt={alt || ''}
        />
    );
};

export default AuthorImage;
