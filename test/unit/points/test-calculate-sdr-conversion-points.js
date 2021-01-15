const expect = require('chai').expect
const calculateSdrConversionPoints = require('../../../app/points/calculate-sdr-conversion-points')

describe('points/calculate-sdr-conversion-points', function () {
  const SDR_CONVERSIONS_LAST_30_DAYS = 20
  const WORKLOAD_POINTS_SDR_CONVERSION = 30

  it('should return expected result when multiplying given inputs', function () {
    expect(calculateSdrConversionPoints(SDR_CONVERSIONS_LAST_30_DAYS, WORKLOAD_POINTS_SDR_CONVERSION))
      .to.equal(600)
  })
})
