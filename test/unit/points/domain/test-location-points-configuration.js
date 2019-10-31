/* eslint-disable no-new */
const expect = require('chai').expect
const LocationPointsConfiguration = require('../../../../app/points/domain/location-points-configuration')

describe('points/domain/location-points-configuration', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () { new LocationPointsConfiguration(undefined, 1, 1, 1, 1, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, undefined, 1, 1, 1, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, undefined, 1, 1, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, 1, undefined, 1, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, 1, 1, undefined, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, 1, 1, 1, undefined, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, 1, 1, 1, 1, undefined, 1, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, 1, 1, 1, 1, 1, undefined, 1, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, 1, 1, 1, 1, 1, 1, undefined, 1) }).to.throw(Error)
    expect(function () { new LocationPointsConfiguration(1, 1, 1, 1, 1, 1, 1, 1, 1, undefined) }).to.throw(Error)
  })
  it('retrieves all values', function () {
    var locationPointsConfiguration = new LocationPointsConfiguration(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    expect(locationPointsConfiguration.tierOne).to.equal(1)
    expect(locationPointsConfiguration.tierTwo).to.equal(2)
    expect(locationPointsConfiguration.tierThree).to.equal(3)
    expect(locationPointsConfiguration.tierFour).to.equal(4)
    expect(locationPointsConfiguration.tierFive).to.equal(5)
    expect(locationPointsConfiguration.tierSix).to.equal(6)
    expect(locationPointsConfiguration.tierSeven).to.equal(7)
    expect(locationPointsConfiguration.tierEight).to.equal(8)
    expect(locationPointsConfiguration.tierNine).to.equal(9)
    expect(locationPointsConfiguration.tierTen).to.equal(10)
  })
})
