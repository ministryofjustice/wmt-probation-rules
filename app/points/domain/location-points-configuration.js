const assertNumber = require('./validation/assert-number')

// WMT0160: Please Note that since E, F and G tiers are new tiers after the original 7,
// they have the number 8, 9 and 10. When these are exported as a list, they should be placed before tier 1
// i.e. tierTen, tierNine, tierEight, tierOne, tierTwo ...
class TierPointsConfiguration {
  constructor (tierOne, tierTwo, tierThree, tierFour, tierFive, tierSix, tierSeven, tierEight, tierNine, tierTen) {
    this.tierOne = tierOne // Tier D2
    this.tierTwo = tierTwo // Tier D1
    this.tierThree = tierThree // Tier C2
    this.tierFour = tierFour // Tier C1
    this.tierFive = tierFive // Tier B2
    this.tierSix = tierSix // Tier B1
    this.tierSeven = tierSeven // Tier A
    this.tierEight = tierEight // Tier E
    this.tierNine = tierNine // Tier F
    this.tierTen = tierTen // Tier G
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
    assertNumber(this.tierEight, 'Tier Eight')
    assertNumber(this.tierNine, 'Tier Nine')
    assertNumber(this.tierTen, 'Tier Ten')
  }

  asTierList () {
    return [
      this.tierOne,
      this.tierTwo,
      this.tierThree,
      this.tierFour,
      this.tierFive,
      this.tierSix,
      this.tierSeven,
      this.tierEight,
      this.tierNine,
      this.tierTen
    ]
  }
}

module.exports = TierPointsConfiguration
