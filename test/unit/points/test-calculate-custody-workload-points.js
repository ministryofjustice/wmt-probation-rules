const expect = require('chai').expect
const calculateCustodyWorkloadPoints = require('../../../app/points/calculate-custody-workload-points')

describe('points/calculate-custody-workload-points', function () {
  it('should calculate the value without error', function () {
    var result = calculateCustodyWorkloadPoints()
    expect(result).to.equal(1)
  })
})
