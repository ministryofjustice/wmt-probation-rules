var calculatedWeightedPoints = function (count, points, weighting = 1) {
  return count * points * weighting
}

module.exports = function (tierCounts, tierPoints, caseTypeWeightings) {
  var pointsForTier = calculatedWeightedPoints(tierCounts.total, tierPoints)
  pointsForTier -= calculatedWeightedPoints(tierCounts.warrants, tierPoints, caseTypeWeightings.warrants)
  pointsForTier -= calculatedWeightedPoints(tierCounts.unpaidWork, tierPoints, caseTypeWeightings.unpaidWork)
  pointsForTier -= calculatedWeightedPoints(tierCounts.overdueTermination, tierPoints, caseTypeWeightings.overdueTermination)

  return pointsForTier
}
