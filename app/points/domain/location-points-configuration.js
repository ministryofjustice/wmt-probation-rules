const assertNumber = require('./validation/assert-number')

class TierPointsConfiguration {
  constructor (tierOne, tierTwo, tierThree, tierFour, tierFive, tierSix, tierSeven) {
    this.tierOne = tierOne
    this.tierTwo = tierTwo
    this.tierThree = tierThree
    this.tierFour = tierFour
    this.tierFive = tierFive
    this.tierSix = tierSix
    this.tierSeven = tierSeven
    this.isValid()
  }

  isValid () {
    assertNumber(this.tierOne, 'Tier One')
    assertNumber(this.tierTwo, 'Tier Two')
    assertNumber(this.tierThree, 'Tier Three')
    assertNumber(this.tierFour, 'Tier Four')
    assertNumber(this.tierFive, 'Tier Five')
    assertNumber(this.tierSix, 'Tier Six')
    assertNumber(this.tierSeven, 'Tier Seven')
  }

  asTierList () {
    return [
      this.tierOne,
      this.tierTwo,
      this.tierThree,
      this.tierFour,
      this.tierFive,
      this.tierSix,
      this.tierSeven
    ]
  }
}

module.exports = TierPointsConfiguration
