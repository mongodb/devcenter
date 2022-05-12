const redirectsList = require('./redirects.json');

const redirects = async () => {
    return redirectsList;
};

module.exports = {
    redirects: redirects,
};
