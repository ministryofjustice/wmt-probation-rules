const HOURS_PER_LICENSE_CASE = 1
const HOURS_PER_COMMUNITY_CASE = 1

module.exports = function (numberOfLicenseCases, numberOfCommunityCases, licenseWeighting, communityWeighting) {
  var pointsForLicenseCases = numberOfLicenseCases * HOURS_PER_LICENSE_CASE * licenseWeighting
  var pointsForCommunityCases = numberOfCommunityCases * HOURS_PER_COMMUNITY_CASE * communityWeighting

  return pointsForLicenseCases + pointsForCommunityCases
}
