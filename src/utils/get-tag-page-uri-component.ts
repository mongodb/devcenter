export const getTagPageUriComponent = (tagPageUri: string) => {
    switch (tagPageUri) {
        case '.NET':
            return 'dotnet';
        case 'c#':
            return 'csharp';
        default:
            return tagPageUri.toLowerCase().replace(/\W/g, '-');
    }
};
