var dsv = require("./dsv");

var tsv = dsv("\t");
	csv = dsv(",");

console.log(tsv.parse("first\tlast\nMike\tBostock\nJunebug\tEdwards-Wilson"));

console.log(tsv.parse('"first","last"\n"Mike","Bostock"\n"Martin","Edwards-Wilson"'));