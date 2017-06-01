const Locations = require('../../app/staging/constants/locations')
const mapToWorkload = require('../../app/context-map/workload')
const mapToTier = require('../../app/context-map/tier')

module.exports = function (omWorkload) {
  var communityCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.COMMUNITY))
  var custodyCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.CUSTODY))
  var licenseCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.LICENSE))

  var communityTiers = getIndividualTiers(communityCaseDetails)
  var custodyTiers = getIndividualTiers(custodyCaseDetails)
  var licenseTiers = getIndividualTiers(licenseCaseDetails)

  var workload = mapToWorkload(communityTiers, custodyTiers, licenseTiers, omWorkload.workloadId)
  return workload
}

var getByLocation = function (location) {
  return function (element) {
    return element.location === location
  }
}

var getByTierCode = function (tierCode) {
  return function (element) {
    return element.tierCode === tierCode
  }
}

var getByRowType = function (rowType) {
  return function (element) {
    return element.rowType === rowType
  }
}

var getIndividualTiers = function (caseDetails) {
  var tiers = []
  for (var i = 0; i < 8; i++) {
    tiers.push(getTierCounts(caseDetails.filter(getByTierCode(i))))
  }
  return tiers
}

var getTierCounts = function (tierDetails) {
  if (tierDetails === undefined || tierDetails.length === 0) {
    return mapToTier(0, 0, 0, 0, 0)
  }
  var unpaidWorkCount = tierDetails.filter(getByRowType('U')).length
  var warrantCount = tierDetails.filter(getByRowType('W')).length
  var overDueTermination = tierDetails.filter(getByRowType('O')).length

  var totalCaseCount = unpaidWorkCount + warrantCount + overDueTermination

  return mapToTier(totalCaseCount, unpaidWorkCount, warrantCount, overDueTermination, undefined)
}
