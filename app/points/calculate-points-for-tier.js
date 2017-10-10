const TierCounts = require('../../app/points/domain/tier-counts')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')
const assertNumber = require('../../app/points/domain/validation/assert-number')
const calculateWeighting = require('./calculate-weighting')

var calculateWeightedPoints = function (count, points, weighting = 0) {
  return count * (points * calculateWeighting(weighting))
}

module.exports = function (tierCounts, tierPoints, caseTypeWeightings) {
  assertObjectType(tierCounts, TierCounts, 'Tier-counts')
  assertNumber(tierPoints, 'Tier Points')
  var pointsForTier = calculateWeightedPoints(tierCounts.total, tierPoints)
  pointsForTier -= calculateWeightedPoints(tierCounts.warrants, tierPoints, caseTypeWeightings.warrants)
  pointsForTier -= calculateWeightedPoints(tierCounts.unpaidWork, tierPoints, caseTypeWeightings.unpaidWork)
  pointsForTier -= calculateWeightedPoints(tierCounts.overdueTermination, tierPoints, caseTypeWeightings.overdueTermination)

  return pointsForTier
}
