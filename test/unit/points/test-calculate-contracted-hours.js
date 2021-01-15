const calculateContractedHours = require('../../../app/points/calculate-contracted-hours')
const DefaultContractedHours = require('../../../app/points/domain/default-contracted-hours')
const expect = require('chai').expect

const OM_TYPE_IDS = require('../../../app/points/constants/offender-manager-type-ids')

describe('points/calculate-contracted-hours', function () {
  let contractedHoursPerWeek
  let defaultContractedHours
  let offenderManagerTypeId

  beforeEach(function () {
    contractedHoursPerWeek = 7
    defaultContractedHours = new DefaultContractedHours(12, 7, 0)
  })

  it('should return contracted hours', function () {
    offenderManagerTypeId = 1
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, offenderManagerTypeId)).to.be.an('object')
  })

  it(`returns default PSO contracted hours when offender manager type ID is ${OM_TYPE_IDS.PSO}`, function () {
    const result = calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.PSO)
    expect(result).to.be.an('object')
    expect(result.baseHours).to.equal(7)
    expect(result.defaultContractedHoursForBand).to.equal(12)
  })

  it(`returns default PSO contracted hours when offender manager type ID is ${OM_TYPE_IDS.PSO_B}`, function () {
    const result = calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.PSO_B)
    expect(result).to.be.an('object')
    expect(result.baseHours).to.equal(7)
    expect(result.defaultContractedHoursForBand).to.equal(12)
  })

  it(`returns default SPO contracted hours when offender manager type ID is ${OM_TYPE_IDS.SPO}`, function () {
    const result = calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.SPO)
    expect(result).to.be.an('object')
    expect(result.baseHours).to.equal(7)
    expect(result.defaultContractedHoursForBand).to.equal(0)
  })

  it('returns other default contracted hours when offender manager type ID is an unexpected number', function () {
    const result = calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, 1)
    expect(result).to.be.an('object')
    expect(result.baseHours).to.equal(7)
    expect(result.defaultContractedHoursForBand).to.equal(7)
  })

  it('uses defaultContractedHoursForBand when contractedHoursPerWeek is not provided', function () {
    // TODO: check if zero for this is an acceptable answer or should it use defaultContractedHoursForBand too.
    const result = calculateContractedHours(null, defaultContractedHours, OM_TYPE_IDS.PSO_B)
    expect(result).to.be.an('object')
    expect(result.baseHours).to.equal(12)
    expect(result.defaultContractedHoursForBand).to.equal(12)
  })

  it(`returns null when offender manager type ID is ${OM_TYPE_IDS.UNSUPPORTED}`, function () {
    /* eslint-disable no-unused-expressions */
    expect(calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.UNSUPPORTED)).to.be.null
  })

  it(`returns default TPO contracted hours when offender manager type ID is ${OM_TYPE_IDS.TPO}`, function () {
    const result = calculateContractedHours(contractedHoursPerWeek, defaultContractedHours, OM_TYPE_IDS.TPO)
    expect(result).to.be.an('object')
    expect(result.baseHours).to.equal(7)
    expect(result.defaultContractedHoursForBand).to.equal(7)
  })
})
