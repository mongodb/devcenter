export const getPlaceHolderImage = (url: string | undefined) => {
    return url
        ? url
        : 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_7a04dd64b1.png';
};
