#!/usr/bin/env node

var fs = require("fs");
var browserify = require('browserify');
var csvify = require("../index");
var assert = require("assert");

//thx http://jakebillo.com/csv-and-tsv-files-for-countries-states-and-provinces/
var sampleCSV = __dirname + "/states.csv";
var sampleTSV = __dirname + "/countries.tsv";

var b = browserify();
b.add(sampleCSV);
b.add(sampleTSV);

b.transform(csvify);

b.bundle(function (err, src) {
	if (err) {
		assert.fail(err);
	}
	fs.writeFile(__dirname + "/bundle.js", src);
	assert.ok(src);
});