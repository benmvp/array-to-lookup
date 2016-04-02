var expect = require('chai').expect,
    toLookup = require('./');

describe('toLookup', function() {
    it('returns an empty object when no parameters are specified', function() {
        var lookup = toLookup();

        expect(lookup).to.deep.equal({});
    });

    it('returns an empty object when empty values are specified', function() {
        var lookup = toLookup([]);

        expect(lookup).to.deep.equal({});
    });

    it('defaults values to `true` when no `lookupValue` parameter is specified', function() {
        var lookup = toLookup(['foo', 'bar']);

        expect(lookup).to.deep.equal({foo: true, bar: true});
    });

    it('uses specified `lookupValue`', function() {
        var lookup = toLookup(['foo', 'bar'], 5);

        expect(lookup).to.deep.equal({foo: 5, bar: 5});
    });

    it('uses `undefined` value when `undefined` is specified as `lookupValue`', function() {
        var lookup = toLookup(['foo', 'bar'], undefined);

        expect(lookup).to.deep.equal({foo: undefined, bar: undefined});
    });

    it('duplicate values in the source array are deduped', function() {
        var lookup = toLookup(['foo', 'bar', 'bar', 'foo']);

        expect(lookup).to.deep.equal({foo: true, bar: true});
    });

    it('coerces non-string values to string keys in lookup', function() {
        var lookup = toLookup(['', 'string', true, 4.01, NaN, Infinity, null, undefined], 1);

        expect(lookup).to.deep.equal({'': 1, 'string': 1, 'true': 1, '4.01': 1, 'NaN': 1, 'Infinity': 1, 'null': 1, 'undefined': 1});
    });

    it('returns a lookup object with a single `undefined` key for all missing/undefined element values in a sparsley populated source array', function() {
        var sparsleyPopulatedArray = [];
        var lookup;

        sparsleyPopulatedArray[2] = 1;
        sparsleyPopulatedArray[7] = 2;

        lookup = toLookup(sparsleyPopulatedArray);

        expect(lookup).to.deep.equal({1: true, 2: true, 'undefined': true});
    });

    it('returns a lookup object with single `undefined` key for all `undefined` element values for a non-zero length source array with unpopulated values', function() {
        var lookup = toLookup(new Array(5));

        expect(lookup).to.deep.equal({undefined: true});
    });

    it('populates a target object when specified', function() {
        var target = {foo: 1},
            lookup = toLookup(['bar', 'hello', 'world'], false, target);

        expect(lookup).to.be.equal(target);
        expect(lookup).to.deep.equal({foo: 1, bar: false, hello: false, world: false});
    });
});
