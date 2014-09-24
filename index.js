var parser = require('./lib/dsv');
var through = require('through');
var fs = require("fs");

try {
	var options = require(process.cwd() + "/package.json");
} catch (e) {
	var options = {};
};

module.exports = function(file) {
	if (!/\.csv$|\.tsv$/.test(file)) {
		return through();
	}

	var data = "";

	return through(function(chunk) {
    	return data += chunk.toString();
  	}, function() {
  		var compiled;

		if (/\.csv/.test(file)) {
			var compiled = parser.csv.parse(data);
		} else {
			var compiled = parser.tsv.parse(data);
		}

		if (options.browserify && options.browserify["transform-options"] && options.browserify["transform-options"]["node-csvify"] == "nojson") {
			compiled = "module.exports = '" + data.replace(/[\r\n]+/g, "|").replace(/'/g, "\\'") + "';";
		} else {
			compiled = "module.exports = " + JSON.stringify(compiled, null, 2) + ";";
		}
		this.queue(compiled);
		return this.queue(null);
	});
};