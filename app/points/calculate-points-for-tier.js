const TierCounts = require('../../app/points/domain/tier-counts')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')
const assertNumber = require('../../app/points/domain/validation/assert-number')

var calculateWeightedPoints = function (count, points, weighting) {
  var weightedPoints = points

  if (weighting !== undefined) {
    weightedPoints = points * invertWeightingPercentage(weighting)
  }

  return count * weightedPoints
}

var invertWeightingPercentage = function (weightingPercentage) {
  var multiplier
  if (weightingPercentage >= 100) {
    multiplier = 0
  } else if (weightingPercentage <= 0) {
    multiplier = 1
  } else {
    multiplier = (100 - weightingPercentage) / 100
  }
  return multiplier
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
