#!/usr/bin/env bun
import fs = require("node:fs/promises");
import path = require("node:path");
import fg = require("fast-glob");
import ignore = require("ignore");

async function loadGitignore(rootDir: string) {
	const gitIgnorePath = path.join(rootDir, ".gitignore");

	try {
		const data = await fs.readFile(gitIgnorePath, "utf8");
		return ignore().add(data.split("\n"));
	} catch (_err) {
		console.warn("No .gitignore found or readable");
		return ignore();
	}
}

async function main() {
	const root = process.cwd();
	const gitignore = await loadGitignore(root);

	const envExampleFiles = await fg("**/.env.example", {
		cwd: root,
		dot: true,
		onlyFiles: true,
		absolute: true,
		ignore: ["node_modules"],
	});

	for (const exampleFile of envExampleFiles) {
		const relativePath = path.resolve(root, exampleFile);

		if (gitignore.ignores(relativePath)) {
			continue;
		}

		const envFile = exampleFile.replace(/\.env\.example$/, ".env");

		try {
			const content = await fs.readFile(exampleFile, "utf8");

			try {
				await fs.access(envFile);
				console.log(`.env already exists, skipping`);
				continue;
			} catch {}

			await fs.writeFile(envFile, content, "utf8");
		} catch (err) {
			console.error(`Error processing ${relativePath}:`, err);
		}
	}

	console.log("All done!");
}

main().catch((err) => {
	console.error(err);
});
