const calculateContractedHours = require('../../../app/points/calculate-contracted-hours')
const DefaultContractedHours = require('../../../app/points/domain/default-contracted-hours')
const expect = require('chai').expect

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
})
