var calculateWeightedPoints = function (count, points, weighting = 1) {
  return count * (points * weighting)
}

module.exports = function (tierCounts, tierPoints, caseTypeWeightings) {
  var pointsForTier = calculateWeightedPoints(tierCounts.total, tierPoints)
  pointsForTier -= calculateWeightedPoints(tierCounts.warrants, tierPoints, caseTypeWeightings.warrants)
  pointsForTier -= calculateWeightedPoints(tierCounts.unpaidWork, tierPoints, caseTypeWeightings.unpaidWork)
  pointsForTier -= calculateWeightedPoints(tierCounts.overdueTermination, tierPoints, caseTypeWeightings.overdueTermination)

  return pointsForTier
}
