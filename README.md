# array-to-lookup

[![version](https://img.shields.io/npm/v/array-to-lookup.svg?style=flat-square)](http://npm.im/array-to-lookup)
[![Build Status](https://travis-ci.org/benmvp/array-to-lookup.svg?branch=master)](https://travis-ci.org/benmvp/array-to-lookup)
[![Coverage Status](https://coveralls.io/repos/github/benmvp/array-to-lookup/badge.svg?branch=master)](https://coveralls.io/github/benmvp/array-to-lookup?branch=master)
[![Dependencies status](https://img.shields.io/david/benmvp/array-to-lookup.svg?style=flat-square)](https://david-dm.org/benmvp/array-to-lookup#info=dependencies)
[![Dev Dependencies status](https://img.shields.io/david/dev/benmvp/array-to-lookup.svg?style=flat-square)](https://david-dm.org/benmvp/array-to-lookup#info=devDependencies)
[![downloads](https://img.shields.io/npm/dt/array-to-lookup.svg?style=flat-square)](http://npm-stat.com/charts.html?package=array-to-lookup&from=2016-03-27)
[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/benmvp/array-to-lookup/pulse)
[![license](https://img.shields.io/npm/l/array-to-lookup.svg?style=flat-square)](http://spdx.org/licenses/MIT)

Convert a JavaScript array into a lookup object.

`array-to-lookup` is derived from the [`Uize`](https://github.com/UIZE/UIZE-JavaScript-Framework/blob/master/site-source/js/Uize.js) module that is a part of the open-source [UIZE JavaScript Framework](https://github.com/UIZE/UIZE-JavaScript-Framework). It is stable, [dependency-free](https://david-dm.org/benmvp/array-to-lookup#info=dependencies), [well-tested](https://coveralls.io/github/benmvp/array-to-lookup?branch=master), and [well-documented](#api-docs).

## Installation

Install via [NPM](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install --save array-to-lookup
```

Use with [Node](https://nodejs.org/en/), [webpack](https://webpack.github.io/) or [browserify](http://browserify.org/):

```js
import toLookup from 'array-to-lookup'; // ES6+
var toLookup = require('array-to-lookup'); // ES5-
```

## API Docs

`array-to-lookup` returns a lookup object, where each key is a value from the specified values array.

### Syntax

[Create a lookup from a values array](#create-a-lookup-from-a-values-array)  
`object = toLookup(values: array)`

[Create a lookup with a custom lookup value](#create-a-lookup-with-a-custom-lookup)  
`object = toLookup(values: array, lookupValue: any)`

[Add more entries to a lookup](#add-more-entries-to-a-lookup)  
`object = toLookup(values: array, lookupValue: any, target: object)`

### Create a lookup from a values array

In the most common usage, a lookup object can be created from a values array by specifying just the `values` parameter. The values in the lookup object default to `true`.

```js
var toLookup = require('array-to-lookup');

var fruits = ['apple', 'peach', 'pear', 'banana', 'orange', 'mango'],
    fruitsLookup = toLookup(fruits);
```

After the above code is executed, the value of the `fruitsLookup` variable will be the following object:

```js
{
    apple: true,
    peach: true,
    pear: true,
    banana: true,
    orange: true,
    mango: true
}
```

### Create a lookup with a custom lookup value

In cases where the default lookup value `true` is not desirable, a different lookup value can be specified using the optional `lookupValue` second parameter.

```js
var toLookup = require('array-to-lookup');

var fruits = ['apple', 'peach', 'pear', 'banana', 'orange', 'mango'],
    foodsLookup = toLookup(fruits, 'fruit');
```

In the above example, the value `'fruit'` is being specified for the optional `lookupValue` parameter. After the above code is executed, the value of the `foodsLookup` variable will be the following object:

```js
{
    apple: 'fruit',
    peach: 'fruit',
    pear: 'fruit',
    banana: 'fruit',
    orange: 'fruit',
    mango: 'fruit'
}
```

Using a custom lookup value can be useful when you're populating a lookup from multiple different values arrays and you want to be able to track which values array a lookup entry came from. For a good illustration of this technique, see the example for the [Add more entries to a lookup](#add-more-entries-to-a-lookup) use case below.

### Add more entries to a lookup

By specifying an existing lookup object for the optional `targetLookup` third parameter, more entries can be added to the existing lookup.

```js
var toLookup = require('array-to-lookup');

var
    fruits = ['apple', 'apricot', 'orange', 'peach', 'pear', 'watermelon'],
    vegetables = ['beet', 'broccoli', 'cauliflower', 'onion', 'potato', 'squash'],
    grains = ['barley', 'maize', 'oats', 'quinoa', 'rice', 'sorghum', 'wheat'],
    foodLookup = toLookup(fruits, 'fruit')
;

// merge in keys for vegetables
toLookup(vegetables, 'vegetable', foodLookup);

// merge in keys for grains
toLookup(grains, 'grain', foodLookup);

// logs "fruit"
console.log(foodLookup['apricot']);

// logs "vegetable"  
console.log(foodLookup['broccoli']);

// logs "grain"
console.log(foodLookup['quinoa']);
```

In the above example, a food lookup object is created initially from the `fruits` array. Then, entries are added to the `foodLookup` lookup object by specifying it as the target in two additional calls to the `toLookup` method: one to merge in lookup entries for the `vegetables` values array, and the other to merge in entries for the `grains` values array. Also note that different lookup values are being used in each case, allowing the `foodLookup` lookup object to be used to look up the food type from the food name.

## Real world example

Creating a lookup object is useful when repeatedly checking to see if values are in a defined values set.

Looping through that defined values set array for each of the lookups would result in poor performance if the set of values to scan through is large, and if the lookup is being performed frequently.

Let's consider an example...

```js
function getValuesInMasterList (values, masterList) {
    var result = [];

    for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (masterList.indexOf(value) > -1) {
            result.push(value);
        }
    }

    return result;
}
```

In the above example, a `getValuesInMasterList` function is being defined. This function accepts two parameters: an array of values, and a master list of values. The function returns an array, containing all the values from the values array that are present in the master list of values. The way it's implemented, on each iteration of the loop through the values array the [`Array.prototype.indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method is being used to determined if the current value is in the master list array. This provides less than optimal performance, since the runtime complexity is _O(n^2)_.

Using the `toLookup` function, a more efficient solution can be fashioned, as follows:

```js
var toLookup = require('array-to-lookup');

function getValuesInMasterList (values, masterList) {
    var result = [],
        masterListLookup = toLookup(masterList);

    for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (masterListLookup[value]) {
            result.push(value);
        }
    }

    return result;
}
```

In the improved version, a lookup object (aka hash table) is created before the loop. Then, in the loop, all that is needed to see if a value being inspected is in the master list is to do a simple dereference into the lookup object, using the value as the key / property name. Here the runtime complexity is _O(n)_, since indexing into the lookup object is constant time.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Project philosophy

We take the stability of this utility package **very** seriously. `array-to-lookup` follows the [SemVer](http://semver.org/) standard for versioning.

All updates must pass the [CI build](https://travis-ci.org/benmvp/array-to-lookup) while maintaining [100% code coverage](https://coveralls.io/github/benmvp/array-to-lookup).

## License

[MIT](LICENSE). Copyright (c) 2016 Ben Ilegbodu.
