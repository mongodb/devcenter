const path = require('path');

const buildEslintCommand = filenames =>
    `next lint --file ${filenames
        .map(f => path.relative(process.cwd(), f))
        .join(' --file ')}`;

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '*': ['yarn format:check'], // .prettierrc takes care of filtering files.
};
