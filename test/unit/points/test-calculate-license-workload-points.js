const expect = require('chai').expect
const calculateLienseWorkloadPoints = require('../../../../app/points/calculate-license-license-workload-points')

describe('points/calculate-license-workload-points', function () {
  it('should calculate the value without error', function () {
    var result = calculateLienseWorkloadPoints()
    expect(result).to.equal(1)
  })
})
