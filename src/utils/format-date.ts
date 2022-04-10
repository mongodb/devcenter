export const formatDateToDisplayDateFormat = (date: Date) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return (
        months[date.getMonth()] +
        ' ' +
        String(date.getDate()).padStart(2, '0') +
        ', ' +
        date.getFullYear()
    );
};
