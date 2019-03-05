const TierCounts = require('../points/domain/tier-counts')
const DestinationTier = require('../points/domain/tier')

module.exports = function (caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount, suspendedCount, suspendedLifersCount) {
  var tierCounts = new TierCounts(caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount, suspendedCount, suspendedLifersCount)
  return new DestinationTier(tierCounts)
}
