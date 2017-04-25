const calculateCommunityTierPoints = require()
const calculateCustodyTierPoints = require()
const calculateLicenseTierPoints = require()

module.exports = function (workload) {
  // TODO: Apply logic
  var totalWorkloadPoints = calculateCommunityTierPoints(workload.communityTiers) + calculateCustodyTierPoints(workload.custodyTiers) + calculateLicenseTierPoints(workload.licenseTiers)
  return totalWorkloadPoints
}
