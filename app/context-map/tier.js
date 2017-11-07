const TierCounts = require('../points/domain/tier-counts')
const DestinationTier = require('../points/domain/tier')

module.exports = function (caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount, suspendedCount) {
  var tierCounts = new TierCounts(caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount, suspendedCount)
  return new DestinationTier(tierCounts)
}
