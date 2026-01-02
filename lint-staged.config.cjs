module.exports = {
	"*.{js,cjs,mjs,ts,mts,tsx,json,css}": "biome check --fix",
	"*.go": (files) => {
		const packages = new Set();
		for (const file of files) {
			const match = file.match(/^(packages\/[^/]+)\//);
			if (match) {
				packages.add(match[1]);
			}
		}
		return Array.from(packages).map(
			(pkg) => `golangci-lint run --fix --new-from-rev=HEAD~1 ${pkg}`,
		);
	},
};
