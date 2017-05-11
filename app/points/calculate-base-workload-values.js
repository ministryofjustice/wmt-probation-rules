const Locations = require('../../app/staging/constants/locations')
const mapToWorkload = require('../../app/context-map/workload')
const mapToTier = require('../../app/context-map/tier')

module.exports = function (omWorkload) {
  var communityCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.COMMUNITY))
  var custodyCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.CUSTODY))
  var licenseCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.LICENSE))

  var communityUntiered = getTierCounts(communityCaseDetails.filter(getByTierCode('0')))
  var communityTierOne = getTierCounts(communityCaseDetails.filter(getByTierCode('1')))
  var communityTierTwo = getTierCounts(communityCaseDetails.filter(getByTierCode('2')))
  var communityTierThree = getTierCounts(communityCaseDetails.filter(getByTierCode('3')))
  var communityTierFour = getTierCounts(communityCaseDetails.filter(getByTierCode('4')))
  var communityTierFive = getTierCounts(communityCaseDetails.filter(getByTierCode('5')))
  var communityTierSix = getTierCounts(communityCaseDetails.filter(getByTierCode('6')))
  var communityTierSeven = getTierCounts(communityCaseDetails.filter(getByTierCode('7')))

  var custodyUntiered = getTierCounts(custodyCaseDetails.filter(getByTierCode('0')))
  var custodyTierOne = getTierCounts(custodyCaseDetails.filter(getByTierCode('1')))
  var custodyTierTwo = getTierCounts(custodyCaseDetails.filter(getByTierCode('2')))
  var custodyTierThree = getTierCounts(custodyCaseDetails.filter(getByTierCode('3')))
  var custodyTierFour = getTierCounts(custodyCaseDetails.filter(getByTierCode('4')))
  var custodyTierFive = getTierCounts(custodyCaseDetails.filter(getByTierCode('5')))
  var custodyTierSix = getTierCounts(custodyCaseDetails.filter(getByTierCode('6')))
  var custodyTierSeven = getTierCounts(custodyCaseDetails.filter(getByTierCode('7')))

  var licenseUntiered = getTierCounts(licenseCaseDetails.filter(getByTierCode('0')))
  var licenseTierOne = getTierCounts(licenseCaseDetails.filter(getByTierCode('1')))
  var licenseTierTwo = getTierCounts(licenseCaseDetails.filter(getByTierCode('2')))
  var licenseTierThree = getTierCounts(licenseCaseDetails.filter(getByTierCode('3')))
  var licenseTierFour = getTierCounts(licenseCaseDetails.filter(getByTierCode('4')))
  var licenseTierFive = getTierCounts(licenseCaseDetails.filter(getByTierCode('5')))
  var licenseTierSix = getTierCounts(licenseCaseDetails.filter(getByTierCode('6')))
  var licenseTierSeven = getTierCounts(licenseCaseDetails.filter(getByTierCode('7')))

  var workload = mapToWorkload(communityUntiered, communityTierOne, communityTierTwo,
                               communityTierThree, communityTierFour, communityTierFive,
                               communityTierSix, communityTierSeven,
                               custodyUntiered, custodyTierOne, custodyTierTwo,
                               custodyTierThree, custodyTierFour, custodyTierFive,
                               custodyTierSix, custodyTierSeven,
                               licenseUntiered, licenseTierOne, licenseTierTwo,
                               licenseTierThree, licenseTierFour, licenseTierFive,
                               licenseTierSix, licenseTierSeven)
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

var getTierCounts = function (tierDetails) {
  if (tierDetails === undefined || tierDetails.length === 0) {
    return mapToTier(0, 0, 0, 0, 0)
  }
  var unpaidWorkCount = tierDetails.filter(getByRowType('U')).length
  var warrantCount = tierDetails.filter(getByRowType('W')).length
  var overDueTermination = tierDetails.filter(getByRowType('O')).length

  var totalCaseCount = unpaidWorkCount + warrantCount + overDueTermination

  return mapToTier(totalCaseCount, unpaidWorkCount, warrantCount, overDueTermination, totalCaseCount)
}
