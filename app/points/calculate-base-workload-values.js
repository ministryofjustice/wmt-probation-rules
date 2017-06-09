const mapToWorkload = require('../../app/context-map/workload')

module.exports = function (omWorkload) {
  var workload = mapToWorkload(omWorkload)
  return workload
}
