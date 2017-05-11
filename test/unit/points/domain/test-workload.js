/* eslint-disable no-new */
const expect = require('chai').expect
const Workload = require('../../../../app/points/domain/workload')
const pointsHelper = require('../../../helpers/points-helper')
const Locations = require('../../../../app/staging/constants/locations')

describe('points/domain/Workload', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () {
      new Workload(undefined,
      pointsHelper.getTestTiersObject(Locations.COMMUNTIY),
      pointsHelper.getTestTiersObject(Locations.LICENSE))
    }).to.throw(Error)
    expect(function () {
      new Workload(pointsHelper.getTestTiersObject(Locations.CUSTODY),
      undefined,
      pointsHelper.getTestTiersObject(Locations.LICENSE))
    }).to.throw(Error)
    expect(function () {
      new Workload(pointsHelper.getTestTiersObject(Locations.CUSTODY),
      pointsHelper.getTestTiersObject(Locations.COMMUNITY),
      undefined)
    }).to.throw(Error)
  })
  it('all fields can be retrieved', function () {
    var workload = pointsHelper.getTestWorkloadObject()
    expect(workload.custodyTiers).to.be.an('object')
    expect(workload.communityTiers).to.be.an('object')
    expect(workload.licenseTiers).to.be.an('object')
  })
})
