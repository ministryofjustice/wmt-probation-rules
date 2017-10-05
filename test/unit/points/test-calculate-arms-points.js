const expect = require('chai').expect

const calculateArmsPoints = require('../../../app/points/calculate-arms-points')

describe('points/calculate-arms-points', function () {
  var licenseCasesCount
  var communityCasesCount
  var licenseWeighting
  var communityWeighting

  beforeEach(function () {
    licenseCasesCount = 0
    communityCasesCount = 0
    licenseWeighting = 0
    communityWeighting = 0
  })

  it('returns 0 when there are no license or community cases', function () {
    communityWeighting = 1
    licenseWeighting = 1

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(0)
  })

  it('returns 0 when license and community weightings are 0 ', function () {
    communityCasesCount = 1
    licenseCasesCount = 1

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(0)
  })

  it('returns 2 when there is 1 license case and the license weighting is 1', function () {
    licenseCasesCount = 1
    licenseWeighting = 1

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(2)
  })

  it('returns 1 when there is 1 license case and the license weighting is 0.5', function () {
    licenseCasesCount = 1
    licenseWeighting = 0.5

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(1)
  })

  it('returns 4 when there is 1 community case and the community weighting is 1', function () {
    communityCasesCount = 1
    communityWeighting = 1

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(4)
  })

  it('returns 2 when there is 1 community case and the community weighting is 0.5', function () {
    communityCasesCount = 1
    communityWeighting = 0.5

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(2)
  })

  it('returns 6 when there is 1 of each case and the both weightings are 1', function () {
    communityCasesCount = 1
    licenseCasesCount = 1
    licenseWeighting = 1
    communityWeighting = 1

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(6)
  })

  it('returns 5 when there is 1 of each case and the license weighting is 0.5', function () {
    communityCasesCount = 1
    licenseCasesCount = 1
    licenseWeighting = 0.5
    communityWeighting = 1

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(5)
  })

  it('returns 4 when there is 1 of each case and the community weighting is 0.5', function () {
    communityCasesCount = 1
    licenseCasesCount = 1
    licenseWeighting = 1
    communityWeighting = 0.5

    var armsPoints = calculateArmsPoints(
            licenseCasesCount,
            communityCasesCount,
            licenseWeighting,
            communityWeighting)

    expect(armsPoints).to.equal(4)
  })
})
