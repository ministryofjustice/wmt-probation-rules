module.exports = function (weightingPercentage) {
  var weighting
  if (weightingPercentage >= 100) {
    weighting = 0
  } else if (weightingPercentage <= 0) {
    weighting = 1
  } else {
    weighting = (100 - weightingPercentage) / 100
  }
  return weighting
}
