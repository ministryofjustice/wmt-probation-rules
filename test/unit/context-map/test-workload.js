const expect = require('chai').expect
const Workload = require('../../../app/points/domain/workload')
const mapper = require('../../../app/context-map/workload')
const pointsHelper = require('../../../test/helpers/points-helper')

describe('context-map/workload', function () {
  it('should map to workload', function () {
    var output = mapper(pointsHelper.getTierCountsList(8),
                        pointsHelper.getTierCountsList(8),
                        pointsHelper.getTierCountsList(8))
    expect(output).to.be.an.instanceof(Workload)
    expect(output.communityTiers.a).to.be.an('object')
    expect(output.custodyTiers.d1).to.be.an('object')
    expect(output.licenseTiers.d2).to.be.an('object')
  })
})