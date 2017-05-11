const Tiers = require('../../app/points/domain/tiers')
const Workload = require('../../app/points/domain/workload')
const Tier = require('../../app/points/domain/tier')
const TierCounts = require('../../app/points/domain/tier-counts')
const Locations = require('../../app/staging/constants/locations')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')

module.exports.getTestWorkloadObject = function () {
  var workload = new Workload(module.exports.getTestTiersObject(Locations.CUSTODY),
                              module.exports.getTestTiersObject(Locations.COMMUNITY),
                              module.exports.getTestTiersObject(Locations.LICENSE))
  return workload
}

module.exports.getTestTiersObject = function (location) {
  var tiers = new Tiers(location,
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject(),
                        module.exports.getTestTierObject())
  return tiers
}

module.exports.getTestTierObject = function () {
  var tier = new Tier(module.exports.getTierCountsObject(), 1)
  return tier
}

module.exports.getTierCountsObject = function () {
  var tierCounts = new TierCounts(4, 1, 1, 1)
  return tierCounts
}

module.exports.getWeightings = function () {
  var weightings = new CaseTypeWeightings(1, 1, 1, [10, 10, 10, 10, 10, 10, 10, 10])
  return weightings
}
