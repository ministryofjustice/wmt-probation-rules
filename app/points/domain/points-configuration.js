const assertObjectType = require('./validation/assert-object-type')
const assertNumber = require('./validation/assert-number')
const assertBoolean = require('./validation/assert-boolean')
const TierPointsConfiguration = require('./tier-points-configuration')

class PointsConfiguration {
  constructor (communityTierPointsConfig, licenseTierPointsConfig, custodyTierPointsConfig,
              sdr, sdrConversion, nominalTargetSPO, defaultContractedHoursPO, defaultContractedHoursSPO, 
              nominalTargetPO, paromsEnabled, parom) {
    this.communityTierPointsConfig = communityTierPointsConfig
    this.licenseTierPointsConfig = licenseTierPointsConfig
    this.custodyTierPointsConfig = custodyTierPointsConfig
    this.sdr = sdr
    this.sdrConversion = sdrConversion
    this.nominalTargetSPO = nominalTargetSPO
    this.nominalTargetPO = nominalTargetPO
    this.defaultContractedHoursPO = defaultContractedHoursPO
    this.defaultContractedHoursSPO = defaultContractedHoursSPO
    this.paromsEnabled = paromsEnabled
    this.parom = parom
    this.isValid()
  }

  isValid () {
    assertObjectType(this.communityTierPointsConfig, TierPointsConfiguration, 'Community Tier Points Config')
    assertObjectType(this.licenseTierPointsConfig, TierPointsConfiguration, 'License Tier Points Config')
    assertObjectType(this.custodyTierPointsConfig, TierPointsConfiguration, 'Custody Tier Points Config')
    assertNumber(this.sdr, 'SDR')
    assertNumber(this.sdrConversion, 'SDR Conversion')
    assertNumber(this.nominalTargetSPO, 'Nominal Target SPO')
    assertNumber(this.nominalTargetPO, 'Nominal Target PO')
    assertNumber(this.defaultContractedHoursPO, 'Default Contracted Hours PO')
    assertNumber(this.defaultContractedHoursSPO, 'Default Contracted Hours SPO')
    assertNumber(this.parom, 'Parom')
    assertBoolean(this.paromsEnabled, 'Paroms')
  }
}

module.exports = PointsConfiguration
