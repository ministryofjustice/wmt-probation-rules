const Tiers = require('../points/domain/tiers')
const TierCounts = require('../points/domain/tier-counts')

const CASE_TYPE_UNPAID = 'U'
const CASE_TYPE_OVERDUE_TERMINATION = 'O'
const CASE_TYPE_WARRANT = 'W'

module.exports = function (summary, details) {
  var total = parseInt(summary.untiered) +
      parseInt(summary.d2) +
      parseInt(summary.d1) +
      parseInt(summary.c2) +
      parseInt(summary.c1) +
      parseInt(summary.b2) +
      parseInt(summary.b1) +
      parseInt(summary.a)

  // TODO this is pretty inefficent, we should replace multiple filters with
  // one sort method which categorises each entry into an appropriate array
  return new Tiers(
    summary.location,
    getTierCounts(parseInt(summary.untiered, 10), details.filter(tierCodeFilter('0'))),
    getTierCounts(parseInt(summary.d2, 10), details.filter(tierCodeFilter('1'))),
    getTierCounts(parseInt(summary.d1, 10), details.filter(tierCodeFilter('2'))),
    getTierCounts(parseInt(summary.c2, 10), details.filter(tierCodeFilter('3'))),
    getTierCounts(parseInt(summary.c1, 10), details.filter(tierCodeFilter('4'))),
    getTierCounts(parseInt(summary.b2, 10), details.filter(tierCodeFilter('5'))),
    getTierCounts(parseInt(summary.b1, 10), details.filter(tierCodeFilter('6'))),
    getTierCounts(parseInt(summary.a, 10), details.filter(tierCodeFilter('7'))),
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
