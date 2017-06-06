const expect = require('chai').expect
const mapper = require('../../../app/context-map/workload')
const stagingHelper = require('../../helpers/staging-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('context-map/workload', function () {
  var caseRefNo = stagingHelper.getGeneratedCaseRefNo()
  var omKey = '1234'
  var omWorkload = stagingHelper.getTestOmWorkload(caseRefNo, omKey, Locations.COMMUNITY)

  it('should validate the parameters are as expected', function () {
    expect(() => mapper({}, 1)).to.throw(Error)
    expect(() => mapper(omWorkload, undefined)).to.throw(Error)
    expect(() => mapper(omWorkload, 1)).not.to.throw(Error)
  })

  it('should calculate the base values correctly', function () {
      // TODO construct an appropriate staging workload object and workout the
      // expected values
  })
})
