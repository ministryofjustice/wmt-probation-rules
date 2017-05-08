const calculateParomPoints = require('../../../app/points/calculate-parom-points')
const expect = require('chai').expect

describe('points/calculate-parom-points', function () {
  var NUMBER_OF_PAROM_COMPLETED_LAST_30_DAYS = 20
  var WP_PAROM = 10

  describe('if PAROM is disabled', function () {
    it('should return zero/0 for the calculation result', function () {
      var paromEnabled = false
      expect(calculateParomPoints(
        NUMBER_OF_PAROM_COMPLETED_LAST_30_DAYS,
        WP_PAROM,
        paromEnabled
      )).to.equal(0)
    })
  })

  describe('if PAROM is enabled', function () {
    it('should return expected result when multiplying given inputs', function () {
      var paromEnabled = true
      expect(calculateParomPoints(
        NUMBER_OF_PAROM_COMPLETED_LAST_30_DAYS,
        WP_PAROM,
        paromEnabled
      )).to.equal(200)
    })
  })
})
