const calculateContractedHours = require('../../../app/points/calculate-contracted-hours')
const DefaultContractedHours = require('../../../app/points/domain/default-contracted-hours')
const expect = require('chai').expect

const OM_TYPE_IDS = require('../../../app/points/constants/offender-manager-type-ids')

describe('points/calculate-contracted-hours', function () {
  var contractedHoursPerWeek
  var defaultContractedHours
  var offenderManagerTypeId

  beforeEach(function () {
    contractedHoursPerWeek = 7
    defaultContractedHours = new DefaultContractedHours(12, 7)
  })

  it('should return null when unsupported type is selected', function () {
    offenderManagerTypeId = 4
    /* eslint-disable no-unused-expressions */
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, offenderManagerTypeId)).to.be.null
  })

  it('should return contracted hours', function () {
    offenderManagerTypeId = 1
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, offenderManagerTypeId)).to.be.an('object')
  })

  it(`returns default PSO contracted hours when offender manager type ID is ${OM_TYPE_IDS.PSO}`, function () {
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.PSO)).to.be.an('object')
  })

  it(`returns default PSO contracted hours when offender manager type ID is ${OM_TYPE_IDS.PSO_B}`, function () {
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.PSO_B)).to.be.an('object')
  })

  it(`returns default PSO contracted hours when offender manager type ID is ${OM_TYPE_IDS.PSO_C}`, function () {
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.PSO_C)).to.be.an('object')
  })

  it('returns other default contracted hours when offender manager type ID is an unexpected number', function () {
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, 1)).to.be.an('object')
  })

  it('uses defaultContractedHoursForBand when contractedHoursPerWeek is not provided', function () {
    // TODO: check if zero for this is an acceptable answer or should it use defaultContractedHoursForBand too.
    expect(calculateContractedHours(null, defaultContractedHours, OM_TYPE_IDS.PSO_B)).to.be.an('object')
  })

  it(`returns null when offender manager type ID is ${OM_TYPE_IDS.UNSUPPORTED_A}`, function () {
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.UNSUPPORTED_A)).to.be.null
  })

  it(`returns null when offender manager type ID is ${OM_TYPE_IDS.UNSUPPORTED_B}`, function () {
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.UNSUPPORTED_B)).to.be.null
  })
})
