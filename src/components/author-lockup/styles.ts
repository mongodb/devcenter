import { ThemeUICSSObject } from "theme-ui";

export const container = {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    gap: 'inc30',
};

export const profileImage = (size: 'small' | 'large') => ({
    objectFit: 'cover',
    position: 'relative',
    borderRadius: '50%',
    width: size === 'small' ? '40px' : ['40px', null, null, '64px'], // This is how it is in flora, idk why they're not using theme vals.
    height: size === 'small' ? '40px' : ['40px', null, null, '64px'],
}) as ThemeUICSSObject;

export const avatarPlaceholder = (size: 'small' | 'large') => ({
    position: 'relative',
    backgroundColor: 'blue80',
    borderRadius: '50%',
    width: size === 'small' ? '40px' : ['40px', null, null, '64px'],
    height: size === 'small' ? '40px' : ['40px', null, null, '64px'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}) as ThemeUICSSObject;

export const typographyContainer: ThemeUICSSObject = {
    display: 'flex',
    flexDirection: 'column',
};

export const stackedImageStyles = (size: 'small' | 'large') => ({
    right: size === 'small' ? '15px' : ['15px', null, null, '24px'],
    marginRight: size === 'small' ? '-15px' : ['-15px', null, null, '-24px'],
    border: '2px solid white',
});
