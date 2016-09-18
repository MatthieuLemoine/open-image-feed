const path = require('path');

const config = {
  getProjectRoots() {
    return getRoots();
  },
  getAssetRoots() {
    return getRoots();
  },

};

function getRoots() {
  return [
    __dirname,
    path.resolve(__dirname, '..')
  ];
}

module.exports = config;
