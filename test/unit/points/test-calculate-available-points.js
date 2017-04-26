const expect = require('chai').expect

const DefaultContractedHours = require('../../../app/points/domain/default-contracted-hours')
const calculateAvailablePoints = require('../../../app/points/calculate-available-points')
const OM_TYPE_IDS = require('../../../app/points/constants/offender-manager-type-ids')

describe('points/calculate-available-points', function () {
  var nominalTarget
  var contractedHoursPerWeek
  var hoursReduction
  var defaultContractedHours

  beforeEach(function () {
    nominalTarget = 7
    contractedHoursPerWeek = 40
    hoursReduction = 0
    defaultContractedHours = new DefaultContractedHours(12, 7)
  })

  it('returns default PSO contracted hours when offender manager type ID is 2', function () {
    expect(
          calculateAvailablePoints(
            nominalTarget, OM_TYPE_IDS.PSO, contractedHoursPerWeek,
            hoursReduction, defaultContractedHours
          )
        ).to.equal(23)
  })

  it('returns default PSO contracted hours when offender manager type ID is 3', function () {
    expect(
        calculateAvailablePoints(
          nominalTarget, OM_TYPE_IDS.PSO_B, contractedHoursPerWeek,
          hoursReduction, defaultContractedHours
        )
      ).to.equal(23)
  })

  it('returns default PSO contracted hours when offender manager type ID is 7', function () {
    expect(
        calculateAvailablePoints(
          nominalTarget, OM_TYPE_IDS.PSO_C, contractedHoursPerWeek,
          hoursReduction, defaultContractedHours
        )
      ).to.equal(23)
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

  it('returns 0 when offender manager type ID is 4', function () {
    expect(
      calculateAvailablePoints(
        nominalTarget, OM_TYPE_IDS.UNSUPPORTED_A, contractedHoursPerWeek,
        hoursReduction, defaultContractedHours
        )
    ).to.equal(0)
  })

  it('returns 0 when offender manager type ID is 4', function () {
    expect(
      calculateAvailablePoints(
        nominalTarget, OM_TYPE_IDS.UNSUPPORTED_B, contractedHoursPerWeek,
        hoursReduction, defaultContractedHours
        )
    ).to.equal(0)
  })
})
