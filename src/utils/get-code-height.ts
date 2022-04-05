export const getCodeHeight = (numLines: number) => {
    return numLines <= 8
        ? 'small'
        : numLines > 8 && numLines <= 12
        ? 'medium'
        : 'large';
};

export const getNumberOfLines = (value: string) => {
    return value.split(/\r|\n/).length;
};
