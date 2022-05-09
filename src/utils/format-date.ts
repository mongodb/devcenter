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

export const constructDateDisplay = (
    vidOrPod: boolean,
    contentDate: string,
    updateDate?: string
) => {
    const date = `Published ${formatDateToDisplayDateFormat(
        new Date(contentDate)
    )}`;
    if (vidOrPod) {
        return date;
    }
    if (updateDate) {
        return date.concat(
            ` • Updated ${formatDateToDisplayDateFormat(new Date(updateDate))}`
        );
    }
};
