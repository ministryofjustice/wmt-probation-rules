/* eslint-disable no-new */

const expect = require('chai').expect
const moment = require('moment')
const Region = require('../../../../app/points/domain/region')

describe('services/domain/region', function () {
  var id = 1231
  var code = '304AF'
  var description = 'test description'

  it('should construct a region domain object', function (done) {

    var region = new Region(id, code, description)

    expect(region.id).to.equal(id)
    expect(region.code).to.equal(code)
    expect(region.description).to.equal(description)
    done()
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new Region(undefined, code, description) }).to.throw(Error)
    expect(function () { new Region(id, undefined, description) }).to.throw(Error)
  })

  it('throws an error when any numeric property is not a number', function () {
    expect(function () { new Region('String') }).to.throw(Error)
  })

})
