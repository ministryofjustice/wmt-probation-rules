const OmWorkload = require('./app/staging/domain/om-workload')
const CaseSummary = require('./app/staging/domain/case-summary')
const CaseDetails = require('./app/staging/domain/case-details')

const stagingHelper = require('./test/helpers/staging-helper')

module.exports = {
  OmWorkload: OmWorkload,
  CaseSummary: CaseSummary,
  CaseDetails: CaseDetails,
  stagingTestHelper: stagingHelper
}
