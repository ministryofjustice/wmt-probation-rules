const calculateCommunityTierPoints = require()
const calculateCustodyTierPoints = require()
const calculateLicenseTierPoints = require()

module.exports = function (workload) {
  var totalWorkloadPoints = calculateCommunityTierPoints(workload.communityTiers) + calculateCustodyTierPoints(workload.custodyTiers) + calculateLicenseTierPoints(workload.licenseTiers)
  return totalWorkloadPoints
}


// TODO: Calculate mappa values, questions around this.
