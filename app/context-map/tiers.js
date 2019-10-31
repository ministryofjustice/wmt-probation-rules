const Tiers = require('../points/domain/tiers')
const TierCounts = require('../points/domain/tier-counts')
const zeroIfNull = require('./helpers/zero-if-null')

const CASE_TYPE_UNPAID = 'U'
const CASE_TYPE_OVERDUE_TERMINATION = 'O'
const CASE_TYPE_WARRANT = 'W'
const CASE_TYPE_SUSPENDED = 'S'
const CASE_TYPE_SUSPENDED_LIFERS = 'L'

module.exports = function (summary, details, t2a = false) {
  var total = zeroIfNull(summary.untiered) +
    zeroIfNull(summary.g) +
    zeroIfNull(summary.f) +
    zeroIfNull(summary.e) +
    zeroIfNull(summary.d2) +
    zeroIfNull(summary.d1) +
    zeroIfNull(summary.c2) +
    zeroIfNull(summary.c1) +
    zeroIfNull(summary.b2) +
    zeroIfNull(summary.b1) +
    zeroIfNull(summary.a)

  if (t2a) {
    // For T2A cases they are identical to normal cases and there are no different
    return new Tiers(
      summary.location,
      getTierCounts(zeroIfNull(summary.untiered), [], 0),
      getTierCounts(zeroIfNull(summary.d2), [], 1),
      getTierCounts(zeroIfNull(summary.d1), [], 2),
      getTierCounts(zeroIfNull(summary.c2), [], 3),
      getTierCounts(zeroIfNull(summary.c1), [], 4),
      getTierCounts(zeroIfNull(summary.b2), [], 5),
      getTierCounts(zeroIfNull(summary.b1), [], 6),
      getTierCounts(zeroIfNull(summary.a), [], 7),
      getTierCounts(zeroIfNull(summary.e), [], 8),
      getTierCounts(zeroIfNull(summary.f), [], 9),
      getTierCounts(zeroIfNull(summary.g), [], 10),
      total
    )
  } else {
    // TODO this is pretty inefficent, we should replace multiple filters with
    // one sort method which categorises each entry into an appropriate array
    return new Tiers(
      summary.location,
      getTierCounts(zeroIfNull(summary.untiered), details.filter(tierCodeFilter('0')), 0),
      getTierCounts(zeroIfNull(summary.d2), details.filter(tierCodeFilter('1')), 1),
      getTierCounts(zeroIfNull(summary.d1), details.filter(tierCodeFilter('2')), 2),
      getTierCounts(zeroIfNull(summary.c2), details.filter(tierCodeFilter('3')), 3),
      getTierCounts(zeroIfNull(summary.c1), details.filter(tierCodeFilter('4')), 4),
      getTierCounts(zeroIfNull(summary.b2), details.filter(tierCodeFilter('5')), 5),
      getTierCounts(zeroIfNull(summary.b1), details.filter(tierCodeFilter('6')), 6),
      getTierCounts(zeroIfNull(summary.a), details.filter(tierCodeFilter('7')), 7),
      getTierCounts(zeroIfNull(summary.e), details.filter(tierCodeFilter('8')), 8),
      getTierCounts(zeroIfNull(summary.f), details.filter(tierCodeFilter('9')), 9),
      getTierCounts(zeroIfNull(summary.g), details.filter(tierCodeFilter('10')), 10),
      total
    )
  }
}

var getTierCounts = function (totalCases, tierDetails = [], tierCode) {
  var unpaidWorkCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_UNPAID)).length
  var warrantCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_WARRANT)).length
  var overDueTermination = tierDetails.filter(rowTypeFilter(CASE_TYPE_OVERDUE_TERMINATION)).length
  var suspendedCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_SUSPENDED)).length
  var suspendedLifersCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_SUSPENDED_LIFERS)).length
  try {
    return new TierCounts(totalCases, warrantCount, unpaidWorkCount, overDueTermination, suspendedCount, suspendedLifersCount, tierCode)
  } catch (error) {
    console.log(error)
  }
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
