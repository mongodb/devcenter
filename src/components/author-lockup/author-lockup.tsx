import React from 'react';
import { TypographyScale } from '@mdb/flora';

import AuthorImage from './author-image';
import { container, typographyContainer, stackedImageStyles } from './styles';
import { AuthorLockupProps } from './types';

const AuthorLockup: React.FunctionComponent<AuthorLockupProps> = ({
    className,
    authors,
    title,
    expandedNames = false,
    clickableLinks = false,
    size = 'small',
}) => {
    const nameStyles = clickableLinks
        ? {
              '&:hover': { color: 'black60' },
          }
        : {};

    const NameTag = clickableLinks ? 'a' : 'span';
    const authorNames = expandedNames ? (
        <>
            {authors.map(({ name, url }, index) => (
                <NameTag
                    key={name}
                    sx={nameStyles}
                    {...(clickableLinks
                        ? { href: url, target: '_blank', rel: 'noreferrer' }
                        : {})}
                >
                    {`${name}${
                        authors.length > 1 && index < authors.length - 1
                            ? ', '
                            : ''
                    }`}
                </NameTag>
            ))}
        </>
    ) : (
        <>
            <NameTag
                sx={nameStyles}
                {...(clickableLinks
                    ? {
                          href: authors[0].url,
                          target: '_blank',
                          rel: 'noreferrer',
                      }
                    : {})}
            >
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
            <div sx={{ display: 'flex', alignItems: 'center' }}>
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
