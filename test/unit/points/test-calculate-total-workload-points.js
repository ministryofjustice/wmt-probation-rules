const expect = require('chai').expect
const calculateTotalWorkloadPoints = require('../../../app/points/calculate-total-workload-points')

describe('points/calculate-total-workload-points', function () {
  it('succesfully calculates the total points', function () {
    var result = calculateTotalWorkloadPoints()
    expect(result).to.be(1)
  })
})
