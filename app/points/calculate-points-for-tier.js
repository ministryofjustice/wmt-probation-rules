const calculateWeightedPoints = require('../../app/points/calculate-weighted-points')

module.exports = function (tierCounts, tierPoints, caseTypeWeightings) {
  var pointsForTier = calculateWeightedPoints(tierCounts.total, tierPoints)
  pointsForTier -= calculateWeightedPoints(tierCounts.warrants, tierPoints, caseTypeWeightings.warrants)
  pointsForTier -= calculateWeightedPoints(tierCounts.unpaidWork, tierPoints, caseTypeWeightings.unpaidWork)
  pointsForTier -= calculateWeightedPoints(tierCounts.overdueTermination, tierPoints, caseTypeWeightings.overdueTermination)

  return pointsForTier
}
