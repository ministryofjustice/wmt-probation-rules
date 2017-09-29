const Tiers = require('../points/domain/tiers')
const TierCounts = require('../points/domain/tier-counts')

const CASE_TYPE_UNPAID = 'U'
const CASE_TYPE_OVERDUE_TERMINATION = 'O'
const CASE_TYPE_WARRANT = 'W'

module.exports = function (summary, details) {
  var total = zeroIfUndefined(summary.untiered) +
    zeroIfUndefined(summary.d2) +
    zeroIfUndefined(summary.d1) +
    zeroIfUndefined(summary.c2) +
    zeroIfUndefined(summary.c1) +
    zeroIfUndefined(summary.b2) +
    zeroIfUndefined(summary.b1) +
    zeroIfUndefined(summary.a)

  // TODO this is pretty inefficent, we should replace multiple filters with
  // one sort method which categorises each entry into an appropriate array
  return new Tiers(
    summary.location,
    getTierCounts(zeroIfUndefined(summary.untiered), details.filter(tierCodeFilter('0'))),
    getTierCounts(zeroIfUndefined(summary.d2), details.filter(tierCodeFilter('1'))),
    getTierCounts(zeroIfUndefined(summary.d1), details.filter(tierCodeFilter('2'))),
    getTierCounts(zeroIfUndefined(summary.c2), details.filter(tierCodeFilter('3'))),
    getTierCounts(zeroIfUndefined(summary.c1), details.filter(tierCodeFilter('4'))),
    getTierCounts(zeroIfUndefined(summary.b2), details.filter(tierCodeFilter('5'))),
    getTierCounts(zeroIfUndefined(summary.b1), details.filter(tierCodeFilter('6'))),
    getTierCounts(zeroIfUndefined(summary.a), details.filter(tierCodeFilter('7'))),
    total
  )
}

var getTierCounts = function (totalCases, tierDetails = []) {
  var unpaidWorkCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_UNPAID)).length
  var warrantCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_WARRANT)).length
  var overDueTermination = tierDetails.filter(rowTypeFilter(CASE_TYPE_OVERDUE_TERMINATION)).length

  return new TierCounts(totalCases, warrantCount, unpaidWorkCount, overDueTermination)
}

var tierCodeFilter = function (tierCode) {
  return function (element) {
    return element.tierCode.toString() === tierCode.toString()
  }
}

var rowTypeFilter = function (rowType) {
  return function (element) {
    return element.rowType === rowType
  }
}

var zeroIfUndefined = function (value = 0) {
  if (value === null) {
    value = 0
  }
  return parseInt(value, 10)
}
