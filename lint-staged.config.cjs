module.exports = {
	"*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,css}": "biome check --fix",
	"*.go": ["golangci-lint run --fix", "golangci-lint fmt"],
};
