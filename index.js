var d3 = require('d3');
var through = require('through');

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
		compiled = "module.exports = " + JSON.stringify(compiled, null, 2) + ";";
		this.queue(compiled);
		return this.queue(null);
	});
};