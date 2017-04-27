const calculateCommunityTierPoints = require('../../../app/points/calculate-community-workload-points')
const calculateCustodyTierPoints = require('../../../app/points/calculate-custody-workload-points')
const calculateLicenseTierPoints = require('../../../app/points/calculate-license-workload-points')

module.exports = function (workload, caseTypeWeightings, commTierCPEnabled) {
  var totalWorkloadPoints = calculateCommunityTierPoints(workload.communityTiers, caseTypeWeightings, commTierCPEnabled) +
                            calculateCustodyTierPoints(workload.custodyTiers, caseTypeWeightings) +
                            calculateLicenseTierPoints(workload.licenseTiers, caseTypeWeightings)
  return totalWorkloadPoints
}
