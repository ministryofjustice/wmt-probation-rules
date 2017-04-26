const DefaultContractedHours = require('./domain/default-contracted-hours')
const OM_TYPE_IDS = require('./constants/offender-manager-type-ids')

var calculateAvailablePoints = function (nominalTarget, baseHours, hoursReduction, defaultContractedHoursForBand) {
  return (nominalTarget * (baseHours / defaultContractedHoursForBand)) * ((baseHours - hoursReduction) / baseHours)
}

module.exports = function (nominalTarget, offenderManagerTypeId, contractedHoursPerWeek,
  hoursReduction, defaultContractedHours) {
  if (!(defaultContractedHours instanceof DefaultContractedHours)) {
    throw new Error('defaultContractedHours should be an instance of DefaultContractedHours')
  }

  // TODO: could maybe store this as part of the dict with the values as a hasAvailability flag?
  const UNSUPPORTED_BANDS = [OM_TYPE_IDS.UNSUPPORTED_A, OM_TYPE_IDS.UNSUPPORTED_B]
  const BANDS_TYPE_2 = [OM_TYPE_IDS.PSO, OM_TYPE_IDS.PSO_B, OM_TYPE_IDS.PSO_C]

  var availablePoints = 0

  if (!(UNSUPPORTED_BANDS.indexOf(offenderManagerTypeId) >= 0)) {
    var defaultContractedHoursForBand = 0

    if (BANDS_TYPE_2.indexOf(offenderManagerTypeId) >= 0) {
      defaultContractedHoursForBand = defaultContractedHours.pso
    } else {
      defaultContractedHoursForBand = defaultContractedHours.other
    }

    var baseHours = typeof contractedHoursPerWeek !== 'number'
      ? defaultContractedHoursForBand : contractedHoursPerWeek

    availablePoints =
      calculateAvailablePoints(nominalTarget, baseHours, hoursReduction, defaultContractedHoursForBand)
  }

  return parseInt(availablePoints, 10)
}
