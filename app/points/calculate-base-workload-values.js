const Locations = require('../../app/staging/constants/locations')
const TierCounts = require('../../app/points/domain/tier-counts')

module.exports = function (omWorkload) {
  var communityCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.COMMUNITY))
  var custodyCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.CUSTODY))
  var licenseCaseDetails = omWorkload.caseDetails.filter(getByLocation(Locations.LICENSE))

  var communityTierZeroCount = getTierCounts(communityCaseDetails.filter(getByTierCode('0')))
  var communityTierOneCount = getTierCounts(communityCaseDetails.filter(getByTierCode('1')))
  var communityTierTwoCount = getTierCounts(communityCaseDetails.filter(getByTierCode('2')))
  var communityTierThreeCount = getTierCounts(communityCaseDetails.filter(getByTierCode('3')))
  var communityTierFourCount = getTierCounts(communityCaseDetails.filter(getByTierCode('4')))
  var communityTierFiveCount = getTierCounts(communityCaseDetails.filter(getByTierCode('5')))
  var communityTierSixCount = getTierCounts(communityCaseDetails.filter(getByTierCode('6')))
  var communityTierSevenCount = getTierCounts(communityCaseDetails.filter(getByTierCode('7')))

  var custodyTierZeroCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('0')))
  var custodyTierOneCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('1')))
  var custodyTierTwoCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('2')))
  var custodyTierThreeCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('3')))
  var custodyTierFourCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('4')))
  var custodyTierFiveCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('5')))
  var custodyTierSixCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('6')))
  var custodyTierSevenCount = getTierCounts(custodyCaseDetails.filter(getByTierCode('7')))

  var licenseTierZeroCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('0')))
  var licenseTierOneCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('1')))
  var licenseTierTwoCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('2')))
  var licenseTierThreeCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('3')))
  var licenseTierFourCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('4')))
  var licenseTierFiveCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('5')))
  var licenseTierSixCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('6')))
  var licenseTierSevenCount = getTierCounts(licenseCaseDetails.filter(getByTierCode('7')))

  return communityCaseDetails
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
  var unpaidWorkCount = tierDetails.filter(getByRowType('U')).length
  var warrantCount = tierDetails.filter(getByRowType('W')).length
  var overDueTermination = tierDetails.filter(getByRowType('O')).length

  var totalCaseCount = unpaidWorkCount + warrantCount + overDueTermination

  return new TierCounts(totalCaseCount, unpaidWorkCount, warrantCount, overDueTermination)
}
