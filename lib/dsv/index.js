var dsv = require("./dsv");

module.exports = {
	dsv: dsv,
	tsv: dsv("\t"),
	csv: dsv(",")
}