const path = require("node:path");

function buildGolangciLintCommands(files) {
	const goFiles = files.filter((f) => f.endsWith(".go"));
	if (goFiles.length === 0) return [];

	return Array.from(
		new Set(goFiles.map((f) => `golangci-lint run --fix ${path.dirname(f)}`)),
	);
}

module.exports = {
	"*.{js,cjs,mjs,ts,mts,tsx,json,css}": "biome check --fix",
	"*.go": [buildGolangciLintCommands, "gofmt -w"],
};
