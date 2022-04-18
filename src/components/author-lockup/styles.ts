export const container = {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    gap: 'inc30',
};

export const profileImage = (size: 'small' | 'large') => ({
    position: 'relative' as 'relative',
    borderRadius: '50%',
    width: size === 'small' ? '40px' : ['40px', null, null, '64px'], // This is how it is in flora, idk why they're not using theme vals.
    height: size === 'small' ? '40px' : ['40px', null, null, '64px'],
});

export const avatarPlaceholder = (size: 'small' | 'large') => ({
    position: 'relative' as 'relative',
    backgroundColor: 'blue80',
    borderRadius: '50%',
    width: size === 'small' ? '40px' : ['40px', null, null, '64px'],
    height: size === 'small' ? '40px' : ['40px', null, null, '64px'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const typographyContainer = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    // maxWidth: '256px',
};
