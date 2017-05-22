const expect = require('chai').expect
const calculateBaseWorkloadValues = require('../../../app/points/calculate-base-workload-values')
const stagingHelper = require('../../helpers/staging-helper')
const locations = require('../../../app/staging/constants/locations')

describe('points/calculate-base-workload', function () {
  it('should calculate the base workload values for an offender manager workload', function () {
    var caseRefNo = stagingHelper.getGeneratedCaseRefNo()
    var omKey = '1234'
    var omWorkload = stagingHelper.getTestOmWorkload(caseRefNo, omKey, locations.COMMUNITY)

    var resolvedCases = calculateBaseWorkloadValues(omWorkload)
    expect(resolvedCases).to.be.an('object')
    expect(resolvedCases.communityTiers).to.be.an('object')
    expect(resolvedCases.licenseTiers).to.be.an('object')
    expect(resolvedCases.custodyTiers).to.be.an('object')
  })
})
