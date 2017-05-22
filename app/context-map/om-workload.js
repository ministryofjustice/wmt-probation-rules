const SourceWorkload = require('../staging/domain/om-workload')
const assertObjectType = require('../points/domain/validation/assert-object-type')

module.exports = function (sourceWorkload) {
  assertObjectType(sourceWorkload, SourceWorkload, 'staging/domain/om-workload')
}
