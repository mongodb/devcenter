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

export const dateCompare = (date1: Date, date2: Date) =>
    new Date(
        Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
    ).getTime() ===
    new Date(
        Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
    ).getTime();

export const getTimezone = (date: Date) => {
    const dtf = Intl.DateTimeFormat(undefined, { timeZoneName: 'short' });
    return (
        dtf.formatToParts(date).find(part => part.type === 'timeZoneName')
            ?.value || ''
    );
};

export const formatDateRange = (start: string, end: string) => {
    if (isNaN(Date.parse(start)) && isNaN(Date.parse(end))) {
        return '';
    } else if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
        const valid = isNaN(Date.parse(start)) ? end : start;
        const validDate = new Date(valid);

        return `${validDate.toLocaleString('default', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })} ${getTimezone(validDate)}`;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    let output = '';
    const timeZone = getTimezone(startDate);

    // Same exact date/time, just show the formatted date and time
    if (startDate.getTime() === endDate.getTime()) {
        output +=
            startDate.toLocaleString('default', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }) + ' - ';
        output += startDate.toLocaleString('default', {
            hour: 'numeric',
            hour12: true,
        });
    } else if (dateCompare(startDate, endDate)) {
        // Same day different time, format as a time range
        output += startDate.toLocaleString('default', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        output +=
            startDate.toLocaleString('default', {
                hour: 'numeric',
                hour12: true,
            }) + ' - ';
        output += endDate.toLocaleString('default', {
            hour: 'numeric',
            hour12: true,
        });
    } else {
        // Different days, format as a date range
        output +=
            startDate.toLocaleString('default', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }) + ' - ';
        output +=
            startDate.toLocaleString('default', {
                hour: 'numeric',
                hour12: true,
            }) + ' | ';
        output +=
            endDate.toLocaleString('default', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }) + ' - ';
        output += endDate.toLocaleString('default', {
            hour: 'numeric',
            hour12: true,
        });
    }

    return `${output} ${timeZone}`;
};

export const getLatestDate = (contentDate: string, updatedDate?: string) => {
    let latestDate = new Date(contentDate);

    if (!updatedDate) {
        return latestDate;
    }

    const _updatedDate = new Date(updatedDate);

    if (_updatedDate > latestDate) {
        latestDate = _updatedDate;
    }

    return latestDate;
};
