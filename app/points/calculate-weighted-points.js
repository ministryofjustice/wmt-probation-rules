module.exports = function (count, points, weighting = 1) {
  return count * (points * weighting)
}
