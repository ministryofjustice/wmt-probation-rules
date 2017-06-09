const TierCounts = require('../points/domain/tier-counts')
const DestinationTier = require('../points/domain/tier')

module.exports = function (caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount) {
  var tierCounts = new TierCounts(caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount)
  return new DestinationTier(tierCounts)
}
