const Locations = require('./staging/constants/locations.js')

module.exports = function (value, label) {
  if (value === undefined || Locations.indexOf(value) < 0) {
    throw new Error(label + ' should be a location of COMMUNITY, CUSTODY or LICENSE')
  }
}
