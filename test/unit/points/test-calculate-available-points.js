const expect = require('chai').expect

const DefaultContractedHours = require('../../../app/points/domain/default-contracted-hours')
const calculateAvailablePoints = require('../../../app/points/calculate-available-points')
const OM_TYPE_IDS = require('../../../app/points/constants/offender-manager-type-ids')

describe('points/calculate-available-points', function () {
  var nominalTarget
  var contractedHoursPerWeek
  var hoursReduction
  var defaultContractedHours
  const VALID_BASE_CALCULATION_RESULT = 23
  const NON_PSO_BAND_RESULT = 0 // only reuse this for non pso bands and NOT zero results.

  beforeEach(function () {
    nominalTarget = 7
    contractedHoursPerWeek = 40
    hoursReduction = 0
    defaultContractedHours = new DefaultContractedHours(12, 7, 0)
  })

  it(`returns default PSO contracted hours when offender manager type ID is ${OM_TYPE_IDS.PSO}`, function () {
    expect(
          calculateAvailablePoints(
            nominalTarget, OM_TYPE_IDS.PSO, contractedHoursPerWeek,
            hoursReduction, defaultContractedHours
          )
        ).to.equal(VALID_BASE_CALCULATION_RESULT)
  })

  it(`returns default PSO contracted hours when offender manager type ID is ${OM_TYPE_IDS.PSO_B}`, function () {
    expect(
        calculateAvailablePoints(
          nominalTarget, OM_TYPE_IDS.PSO_B, contractedHoursPerWeek,
          hoursReduction, defaultContractedHours
        )
      ).to.equal(VALID_BASE_CALCULATION_RESULT)
  })

  it('returns other default contracted hours when offender manager type ID is an unexpected number', function () {
    expect(
        calculateAvailablePoints(
          nominalTarget, 1, contractedHoursPerWeek,
          hoursReduction, defaultContractedHours
        )
      ).to.equal(40)
  })

  it('uses defaultContractedHoursForBand when contractedHoursPerWeek is not provided', function () {
    // TODO: check if zero for this is an acceptable answer or should it use defaultContractedHoursForBand too.
    expect(
      calculateAvailablePoints(
        nominalTarget, OM_TYPE_IDS.PSO, null,
        hoursReduction, defaultContractedHours
      )
    ).to.equal(7)
  })

  it(`returns ${NON_PSO_BAND_RESULT} when offender manager type ID is ${OM_TYPE_IDS.UNSUPPORTED}`, function () {
    expect(
      calculateAvailablePoints(
        nominalTarget, OM_TYPE_IDS.UNSUPPORTED, contractedHoursPerWeek,
        hoursReduction, defaultContractedHours
        )
    ).to.equal(NON_PSO_BAND_RESULT)
  })
})
