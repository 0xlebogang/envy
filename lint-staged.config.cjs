const path = require("path");

const buildGoLintCommand = (files) => {
	const commands = files.map((file) => {
		const dir = path.dirname(file);
		return `golangci-lint run --fix --tests=false ${path.join(dir, path.basename(file))}`;
	});
	return commands;
};

module.exports = {
	"*.{js,cjs,mjs,ts,mts,tsx,json,css}": "biome check --fix",
	"*.go": buildGoLintCommand,
};
