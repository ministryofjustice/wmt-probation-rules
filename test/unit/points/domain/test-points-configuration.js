/* eslint-disable no-new */
const expect = require('chai').expect
const PointsConfiguration = require('../../../../app/points/domain/points-configuration')
const pointsHelper = require('../../../helpers/points-helper')

describe('points/domain/points-configuration', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () {
      new PointsConfiguration(undefined, pointsHelper.getLocationPointsConfiguration(),
        pointsHelper.getLocationPointsConfiguration(), 10, 10,
        pointsHelper.getDefaultNominalTargets(),
        pointsHelper.getDefaultContractedHours(), true, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), undefined,
        pointsHelper.getLocationPointsConfiguration(), 10, 10,
        pointsHelper.getDefaultNominalTargets(),
        pointsHelper.getDefaultContractedHours(), true, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), pointsHelper.getLocationPointsConfiguration(),
        undefined, 10, 10,
        pointsHelper.getDefaultNominalTargets(),
        pointsHelper.getDefaultContractedHours(), true, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), pointsHelper.getLocationPointsConfiguration(),
        pointsHelper.getLocationPointsConfiguration(), undefined, 10,
        pointsHelper.getDefaultNominalTargets(),
        pointsHelper.getDefaultContractedHours(), true, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), pointsHelper.getLocationPointsConfiguration(),
        pointsHelper.getLocationPointsConfiguration(), 10, undefined,
        pointsHelper.getDefaultNominalTargets(),
        pointsHelper.getDefaultContractedHours(), true, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), pointsHelper.getLocationPointsConfiguration(),
        pointsHelper.getLocationPointsConfiguration(), 10, 10,
        undefined,
        pointsHelper.getDefaultContractedHours(), true, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), pointsHelper.getLocationPointsConfiguration(),
        pointsHelper.getLocationPointsConfiguration(), 10, 10,
        pointsHelper.getDefaultNominalTargets(),
        undefined, true, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), pointsHelper.getLocationPointsConfiguration(),
        pointsHelper.getLocationPointsConfiguration(), 10, 10,
        pointsHelper.getDefaultNominalTargets(),
        pointsHelper.getDefaultContractedHours(), undefined, 10)
    }).to.throw(Error)
    expect(function () {
      new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(), pointsHelper.getLocationPointsConfiguration(),
        pointsHelper.getLocationPointsConfiguration(), 10, 10,
        pointsHelper.getDefaultNominalTargets(),
        pointsHelper.getDefaultContractedHours(), true, undefined)
    }).to.throw(Error)
  })
  it('retrieves all values', function () {
    const pointsConfiguration = new PointsConfiguration(pointsHelper.getLocationPointsConfiguration(),
      pointsHelper.getLocationPointsConfiguration(),
      pointsHelper.getLocationPointsConfiguration(),
      10, 10, pointsHelper.getDefaultNominalTargets(),
      pointsHelper.getDefaultContractedHours(), true, 10)
    expect(pointsConfiguration.communityTierPointsConfig).to.be.an('object')
    expect(pointsConfiguration.custodyTierPointsConfig).to.be.an('object')
    expect(pointsConfiguration.licenseTierPointsConfig).to.be.an('object')
    expect(pointsConfiguration.sdr).to.equal(10)
    expect(pointsConfiguration.defaultNominalTargets).to.be.an('object')
    expect(pointsConfiguration.defaultContractedHours).to.be.an('object')
    expect(pointsConfiguration.sdrConversion).to.equal(10)
    expect(pointsConfiguration.paromsEnabled).to.equal(true)
    expect(pointsConfiguration.parom).to.equal(10)
  })
})
