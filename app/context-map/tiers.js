const Tiers = require('./tiers.js')

module.exports = function (location, untiered, tierOne, tierTwo, tierThree, tierFour, tierFive, tierSix, tierSeven) {
  var tiers = new Tiers(location, untiered, tierOne, tierTwo, tierThree, tierFour, tierFive, tierSix, tierSeven)
  return tiers
}
