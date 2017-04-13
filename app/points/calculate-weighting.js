module.exports = function(inverseWeightingPercentage) {
    var weighting
    if (inverseWeightingPercentage >= 100) {
        weighting = 0
    } else if (inverseWeightingPercentage <= 0) {
        weighting = 1
    } else {
        weighting = (100 - inverseWeightingPercentage) / 100
    }
    return weighting
}
