module.exports = {
	"*.{js,cjs,mjs,ts,mts,tsx,json,css}": "biome check --fix",
	"*.go": "golangci-lint run --fix --new",
}
