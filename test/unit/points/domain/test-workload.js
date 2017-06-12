 /* eslint-disable no-new */
const expect = require('chai').expect
const Workload = require('../../../../app/points/domain/workload')
const pointsHelper = require('../../../helpers/points-helper')
const Locations = require('../../../../app/staging/constants/locations')

describe('points/domain/Workload', function () {
  var workloadOwnerId = 1
  var totalCases = 1
  var monthlySdrs = 1
  var sdrsDueNext30Days = 1
  var paromsCompletedLast30Days = 1
  var paromsDueNext30Days = 1
  var custodyTiers = pointsHelper.getTestTiersObject(Locations.CUSTODY)
  var communityTiers = pointsHelper.getTestTiersObject(Locations.COMMUNITY)
  var licenseTiers = pointsHelper.getTestTiersObject(Locations.LICENSE)

  var validArgumentList = [
    workloadOwnerId,
    totalCases,
    monthlySdrs,
    sdrsDueNext30Days,
    paromsCompletedLast30Days,
    paromsDueNext30Days,
    custodyTiers,
    communityTiers,
    licenseTiers
  ]

  it('throws an error when any property is undefined', function () {
    var args
    for (var i = 0; i < validArgumentList.length; i++) {
      args = validArgumentList.slice(0)
      args[i] = undefined
      expect(() => new Workload(...args)).to.throw(Error)
    }
  })

  it('all fields can be retrieved', function () {
    var workload = pointsHelper.getTestWorkloadObject()
    expect(workload.custodyTiers).to.be.an('object')
    expect(workload.communityTiers).to.be.an('object')
    expect(workload.licenseTiers).to.be.an('object')
  })
})
