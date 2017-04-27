const expect = require('chai').expect
const OM_TYPE_IDS = require('../../../app/points/constants/offender-manager-type-ids')
const DefaultNominalTargets = require('../../../app/points/domain/default-nominal-targets')

const calculateNominalTarget = require('../../../app/points/calculate-nominal-target')

describe('points/calculate-nominal-target', function () {
  const PSO_TARGET = 1
  const PO_TARGET = 2
  const DEFAULT_TARGETS = new DefaultNominalTargets(PSO_TARGET, PO_TARGET)

  it('returns default target for PSO when PSO type ID is supplied', function () {
    expect(calculateNominalTarget(OM_TYPE_IDS.PSO, DEFAULT_TARGETS)).to.equal(PSO_TARGET)
  })

  it('returns default target for PO when any other OM type ID is supplied', function () {
    expect(calculateNominalTarget(0, DEFAULT_TARGETS)).to.equal(PO_TARGET)
    expect(calculateNominalTarget(100, DEFAULT_TARGETS)).to.equal(PO_TARGET)
  })

  it('throws an error when the default targets object is not an instance of DefaultNominalTargets', function () {
    expect(function () { calculateNominalTarget(0, {}) }).to.throw(Error)
  })

  it('throws an error when the default targets object undefined', function () {
    expect(function () { calculateNominalTarget(0, undefined) }).to.throw(Error)
  })
})
