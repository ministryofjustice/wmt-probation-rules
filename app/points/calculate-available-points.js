const getHours = require('./calculate-contracted-hours')

var calculateAvailablePoints = function (nominalTarget, baseHours, hoursReduction, defaultContractedHoursForBand) {
  return (nominalTarget * (baseHours / defaultContractedHoursForBand)) * ((baseHours - hoursReduction) / baseHours)
}

module.exports = function (nominalTarget, offenderManagerTypeId, contractedHoursPerWeek,
  hoursReduction, defaultContractedHours) {
  var availablePoints = 0
  var resultHours = getHours(contractedHoursPerWeek)
  availablePoints = calculateAvailablePoints(nominalTarget, resultHours.baseHours, hoursReduction, resultHours.defaultContractedHoursForBand)

  return parseInt(availablePoints, 10)
}
