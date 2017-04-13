const expect = require('chai').expect
const TierTotals = require('../../../../app/points/domain/tier-totals')

describe('points/domain/TierTotals', function() {
    it('thows an error when any property is undefined', function() {
        expect(function(){ new TierTotals(undefined, 1, 1, 1) }).to.throw(Error)
        expect(function(){ new TierTotals(1, undefined, 1, 1) }).to.throw(Error)
        expect(function(){ new TierTotals(1, 1, undefined, 1) }).to.throw(Error)
        expect(function(){ new TierTotals(1, 1, 1, undefined) }).to.throw(Error)
    })
    it('thows an error when any property is not a number', function() {
        expect(function(){ new TierTotals("String", 1, 1, 1) }).to.throw(Error)
        expect(function(){ new TierTotals(1, "String", 1, 1) }).to.throw(Error)
        expect(function(){ new TierTotals(1, 1, "String", 1) }).to.throw(Error)
        expect(function(){ new TierTotals(1, 1, 1, "String") }).to.throw(Error)
    })
    it('thows an error when the combined case types are greater than the total', function() {
        expect(function(){ new TierTotals(1, 1, 1, 1) }).to.throw(Error)
    })
    it('doesn\'t throw an error when the combined case types are the same as the total', function() {
        expect(function(){ new TierTotals(3, 1, 1, 1) }).not.to.throw(Error)
    })
    it('doesn\'t throw an error when the combined case types are greater than the total', function() {
        expect(function(){ new TierTotals(5, 1, 1, 1) }).not.to.throw(Error)
    })
    it('all fields can be retrieved', function() {
        tierTotals = new TierTotals(5, 1, 1, 1)
        expect(tierTotals.caseCount).to.equal(5)
        expect(tierTotals.warrantCaseCount).to.equal(1)
        expect(tierTotals.unpaidWorkCaseCount).to.equal(1)
        expect(tierTotals.overdueTerminationCaseCount).to.equal(1)
    })
})
