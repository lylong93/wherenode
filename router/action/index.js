// import publish from './publish'
// import getaction from './getaction'
const publish = require('./publish');
const getaction = require('./getaction');
const actionapi = {
    publish,
    getaction
}

module.exports = actionapi