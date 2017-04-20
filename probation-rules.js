const OmWorkload = require('./app/staging/domain/om-workload')
const CasesSummary = require('./app/staging/domain/cases-summary')
const CaseDetails = require('./app/staging/domain/case-details')

const stagingHelper = require('./test/helpers/staging-helper')

module.exports = {
  OmWorkload: OmWorkload,
  CasesSummary: CasesSummary,
  CaseDetails: CaseDetails,
  stagingTestHelper: stagingHelper
}
