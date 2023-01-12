export const formatEventTypes = (eventType = '') => {
    let formattedType = eventType;

    if (formattedType === 'InPerson') {
        formattedType = 'In-Person';
    }

    return formattedType;
};
