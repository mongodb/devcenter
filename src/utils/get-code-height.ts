export const getCodeHeight = (numLines: number) => {
    return numLines <= 20 ? 'auto' : 'large';
};

export const getNumberOfLines = (value: string) => {
    return value.split(/\r|\n/).length;
};
