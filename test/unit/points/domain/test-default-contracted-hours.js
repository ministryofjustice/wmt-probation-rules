/* eslint-disable no-new */
const expect = require('chai').expect
const DefaultContractedHours = require('../../../../app/points/domain/default-contracted-hours')

describe('points/domain/default-contracted-hours', function () {
  it('thows an error when any property is undefined', function () {
    expect(function () { new DefaultContractedHours(undefined, 1, 1) }).to.throw(Error)
    expect(function () { new DefaultContractedHours(1, undefined, 1) }).to.throw(Error)
    expect(function () { new DefaultContractedHours(1, 1, undefined) }).to.throw(Error)
  })
  it('thows an error when any property is not a number', function () {
    expect(function () { new DefaultContractedHours('String', 1, 1) }).to.throw(Error)
    expect(function () { new DefaultContractedHours(1, 'String', 1) }).to.throw(Error)
    expect(function () { new DefaultContractedHours(1, 1, 'String') }).to.throw(Error)
  })
  it('doesn\'t thow an error when all properties are numbers', function () {
    expect(function () { new DefaultContractedHours(1, 1, 1) }).not.to.throw(Error)
  })
  it('correctly retrieves all fields', function () {
    const defaultContractedHours = new DefaultContractedHours(1, 2, 3)
    expect(defaultContractedHours.pso).to.equal(1)
    expect(defaultContractedHours.po).to.equal(2)
    expect(defaultContractedHours.spo).to.equal(3)
  })
})
