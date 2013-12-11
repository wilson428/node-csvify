node-csvify
===========
Version 0.0.0

Require CSV/TSV files directly in Browserify v2

When bundling an app using [Browserify](http://browserify.org/), it's often convenient to be able to include your .csv (comma-delimited) or .tsv (tab-delimited) files just as you would .json files (which Node natively understands). This small script allows you to `require()` them directly.

## Installation

```
npm install node-csvify
```

## Usage
Simply require your data files as you might anything else:

```
var states = require('./states.csv');
var countries = require('./countries.tsv');
```

Then, when running browserify, pass this module as a transformation on the command line.

```
browserify -t node-csvify script.js > bundle.js
```

## How it works

This module uses [d3's](https://npmjs.org/package/d3) [CSV and TSV parsing functions](https://github.com/mbostock/d3/wiki/CSV) to convert the files to Javascript objects. d3 is very smart about converting headers to property names. For example, this:

	first,last
	Chris,Wilson
	Mike,Bostock
	Miles,Davis

Becomes this:

	[ { first: 'Chris', last: 'Wilson' },
	  { first: 'Mike', last: 'Bostock' },
	  { first: 'Miles', last: 'Davis' } ]