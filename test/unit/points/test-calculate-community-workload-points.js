const expect = require('chai').expect
const calculateCommunityWorkloadPoints = require('../../../app/points/calculate-community-workload-points')

describe('points/calculate-community-workload-points', function () {
  it('should calculate the value without error', function () {
    var result = calculateCommunityWorkloadPoints()
    expect(result).to.equal(1)
  })
})
