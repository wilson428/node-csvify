node-csvify
===========
Version 0.0.2a

[![Build Status](https://travis-ci.org/wilson428/node-csvify.png)](https://travis-ci.org/wilson428/node-csvify)


Require CSV/TSV files directly in Browserify v2

When bundling an app using [Browserify](http://browserify.org/), it's often convenient to be able to include your .csv (comma-delimited) or .tsv (tab-delimited) files just as you would .json files (which Node natively understands). This small script allows you to `require()` them directly.

## Installation

```
npm install node-csvify
```

## Example
Simply require your data files as you might anything else:

```
var states = require('./states.csv');
var countries = require('./countries.tsv');
```

Then, when running browserify, pass this module as a transformation on the command line.

	browserify -t node-csvify script.js > bundle.js

Alternatively, you can specify this module as a transformation in your `package.json` file:

    "browserify": {
        "transform": ["node-csvify"]
    }

By doing so, you can include .csv or .tsv files without including the annoying `-t node-csvify` every time you run browserify.

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

##Reducing file size

By default, this transformation converts the delimited files to JSON before passing them back to browserify. For large CSV files, this can greatly reduce the size, since the headers are now repeated for each record. (In the small example above, the CSV file is about 50 bytes, which the JSON verision is over 100 bytes.) While this sort of redundancy can be compressed very efficiently by [gzip compression](https://developers.google.com/speed/articles/gzip), you may still encounter instances where you want your data passed to its final destination as a compact string. You then assume responsibility for unpacking that string into a useful data format for your application.

There is no good way to pass arguments to transformations from the code itself. Instead, if you want this "no JSON" mode, you have to specify this in the `package.json` file:

    "browserify": {
        "transform": ["node-csvify"],
        "transform-options": {
            "node-csvify": "nojson"
        }
    }

In "nojson" mode, the above example would pass a string to the application with the value: 

	first,last|Chris,Wilson|Mike,Bostock|Miles,Davis

##To Do

Using D3 for parsing .csv and .tsv files is overkill and bloats the dependencies. I ought to replace it with something more lightweight.