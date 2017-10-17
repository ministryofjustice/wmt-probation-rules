 /* eslint-disable no-new */
 const expect = require('chai').expect
 const Workload = require('../../../../app/points/domain/workload')
 const pointsHelper = require('../../../helpers/points-helper')

 describe('points/domain/CourtReports', function () {
   var workloadOwnerId = 1
   var stagingId = 2
   var totalSdrs = 3
   var totalFdrs = 4
   var totalOralReports = 5
   var workloadReportId = 6

   var validArgumentList = [
     workloadOwnerId,
     totalSdrs,
     totalFdrs,
     totalOralReports,
     stagingId,
     workloadReportId
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
     var courtReports = pointsHelper.getTestCourtReportsObject(workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId)
     expect(courtReports.workloadOwnerId).to.eql(workloadOwnerId)
     expect(courtReports.totalSdrs).to.eql(totalSdrs)
     expect(courtReports.totalFdrs).to.eql(totalFdrs)
     expect(courtReports.totalOralReports).to.eql(totalOralReports)
     expect(courtReports.stagingId).to.eql(stagingId)
     expect(courtReports.workloadReportId).to.eql(workloadReportId)
   })
 })
