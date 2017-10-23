const expect = require('chai').expect
const zeroIfNull = require('../../../../app/context-map/helpers/zero-if-null')

var expectedValue = 100

describe('app/context-map/helpers/zero-if-null', function () {
  it('should return the number or 0 if passed a null value', function () {
    expect(zeroIfNull(100)).to.equal(expectedValue)
    expect(zeroIfNull(null)).to.equal(0)
    expect(zeroIfNull(undefined)).to.equal(0)
  })
})
