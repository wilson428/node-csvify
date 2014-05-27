var d3 = require('d3');
var through = require('through');
var fs = require("fs");

try {
	var options = require(process.cwd() + "/package.json");
} catch (e) {
	var options = {};
};

module.exports = function(file) {
	if (!/\.csv|\.tsv/.test(file)) {
		return through();
	}
	var buffer = "";

	return through(function(chunk) {
    	return buffer += chunk.toString();
  	}, function() {
  		var compiled;

		if (/\.csv/.test(file)) {
			var compiled = d3.csv.parse(buffer);
		} else {
			var compiled = d3.tsv.parse(buffer);
		}

		//console.error(buffer.replace(/[\r\n]+/g, "|"));

		if (options.browserify && options.browserify["transform-options"] && options.browserify["transform-options"]["node-csvify"] == "nojson") {
			compiled = "module.exports = '" + buffer.replace(/[\r\n]+/g, "|").replace(/'/g, "\\'") + "';";
		} else {
			compiled = "module.exports = " + JSON.stringify(compiled, null, 2) + ";";
		}
		this.queue(compiled);
		return this.queue(null);
	});
};