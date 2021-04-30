// module to output the absolute path to the given filename
const path = require('path');

module.exports = path.dirname(require.main.filename);