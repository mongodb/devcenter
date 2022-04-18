import React, { useState } from 'react';
import { TypographyScale, Link } from '@mdb/flora';
import {
    container,
    profileImage,
    avatarPlaceholder,
    typographyContainer,
} from './styles';
import { getInitials } from './utils';

interface Author {
    name: string;
    image?: {
        src?: string;
        alt?: string;
    };
    url: string;
}
interface AuthorLockupProps {
    className?: string;
    authors: Author[];
    title?: string;
    expandedNames?: boolean;
    clickableLinks?: boolean;
    size?: 'small' | 'large';
}

const AuthorImage: React.FunctionComponent<{
    author: Author;
    className?: string;
    size: 'small' | 'large';
}> = ({ author, className, size }) => {
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

const AuthorLockup: React.FunctionComponent<AuthorLockupProps> = ({
    className,
    authors,
    title,
    expandedNames = false,
    clickableLinks = false,
    size = 'small',
}) => {
    const stackedImageStyles = (size: 'small' | 'large') => ({
        right: size === 'small' ? '15px' : ['15px', null, null, '24px'],
        marginRight:
            size === 'small' ? '-15px' : ['-15px', null, null, '-24px'],
        border: '2px solid white',
    });
    const nameStyles = clickableLinks
        ? {
              '&:hover': { color: 'black60' },
          }
        : {};

    const NameTag = clickableLinks ? 'a' : 'span';
    const authorNames = expandedNames ? (
        <>
            {authors.map(({ name, url }, index) => (
                <>
                    <NameTag sx={nameStyles} href={url}>
                        {name}
                    </NameTag>
                    {authors.length > 1 && index < authors.length - 1 && ', '}
                </>
            ))}
        </>
    ) : (
        <>
            <NameTag sx={nameStyles} href={authors[0].url}>
                {authors[0].name}
            </NameTag>
            {authors.length > 1 && ` (+${authors.length - 1})`}
        </>
    );
    return (
        <div
            aria-label="author-lockup-container"
            className={className}
            sx={container}
        >
            <div sx={{ display: 'flex' }}>
                {authors.map((author, index) => {
                    let extraStyles = {};
                    if (index > 0) {
                        extraStyles = stackedImageStyles(size);
                    }
                    return (
                        <AuthorImage
                            key={author.name}
                            author={author}
                            sx={extraStyles}
                            size={size}
                        />
                    );
                })}
            </div>
            <div sx={typographyContainer}>
                <TypographyScale
                    variant={size === 'large' ? 'body1' : 'body3'}
                    customStyles={{ fontWeight: size === 'small' ? 400 : 500 }}
                >
                    {authorNames}
                </TypographyScale>
                {!!title && (
                    <TypographyScale
                        variant={size === 'large' ? 'body3' : 'body4'}
                        color="secondary"
                    >
                        {title}
                    </TypographyScale>
                )}
            </div>
        </div>
    );
};

export default AuthorLockup;
