const path = require("path");

module.exports = {
	"*.{js,cjs,mjs,ts,mts,tsx,json,css}": "biome check --fix",
};
