export const getInitials = (name = ''): string => {
    const fullName = name.split(' ');
    const firstNameInitial = fullName.shift()?.charAt(0);
    const lastNameInitial = fullName.pop()?.charAt(0);

    if (firstNameInitial && lastNameInitial) {
        const initials = firstNameInitial + lastNameInitial;
        return initials.toUpperCase();
    }

    if (firstNameInitial) {
        return firstNameInitial.toUpperCase();
    }

    return name;
};
