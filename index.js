/**
  @preserve Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/array-to-lookup.
  Adapted from the Uize.lookup function, a part of the UIZE JavaScript Framework.
*/
(function(factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
})(function() {
    'use strict';

    function toLookup(values, lookupValue, targetLookup) {
        var lookup = targetLookup || {},
            lookupValueToUse = lookupValue,
            valueNo = -1,
            valuesLength;

        if (arguments.length === 1) {
            lookupValueToUse = true;
        }

        if (values) {
            valuesLength = values.length;

            for (; ++valueNo < valuesLength;) {
                lookup[values[valueNo]] = lookupValueToUse;
            }
        }

        return lookup;
    }

    return toLookup;
});
