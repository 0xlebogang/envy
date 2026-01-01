<div align='center'>

# Sekrets

An environment variable management solution that helps centralize variables across distributed teams.

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![License](https://img.shields.io/badge/license-AGPL--3.0-blue)
![pnpm](https://img.shields.io/badge/package%20manager-pnpm-yellow)
![turbo](https://img.shields.io/badge/build%20tool-turborepo-white)

</div>

> This project is currently under active development and the documentation might not  be as accurate as it should be.
>
> Please [create an issue](https://github.com/0xlebogang/sekrets/issues/new/choose) detailing the inacuracies you've encountered. Or better yet, [create a PR](https://github.com/0xlebogang/sekrets/compare). We'll be happy to merge you contribution.

## Overview

Often than not, collaborating with other developers on a project always gets to a point where you need to either give other members access to these variables, or everyone needs to use the same variables.

Sekrets (formerly Envyper), helps you do just that more securely. With it, you'll be able to manage all your project's environment variables on a web-based interface with each member's access controlled.

The platform is actively evolving and any contributions (feature requests, etc) would be much appreciated!

## Getting started

To get Sekrets up and running locally for development, follow these steps:

> We use [mise](https://mise.jdx.dev/) to manage the project's tooling. This will be the prioritized approach in tool installations. You can otherwise install each tool manually, have a look at the [required tools](#tools).

### Prequisites

#### Tools

- [Go](https://go.dev) (v1.24.11)
- [Golangci-lint](https://golangci-lint.run) (latest stable version)
- [Air](https://github.com/air-verse/air) (latest stable version)
- [Node](https://nodejs.org/) (v20.9+)
- [pnpm](https://pnpm.io) (v10.15.1)
- [Turborepo](https://turborepo.com) (latest stable version)
- [Docker & Docker compose](https://docker.com) (latest stable versions)

#### Setup mise

> This guide assumes you already have the latest stable version of [docker & docker compose](https://docs.docker.com/get-docker/) installed on your system.

1. [Install mise](https://mise.jdx.dev/getting-started.html#installing-mise-cli) following the approach for you operating system.

2. Setup mise to manage your `PATH` variables while in the project directory by following the instructions [here](https://mise.jdx.dev/getting-started.html#activate-mise). (optional but recommended)
	 > If you choose not to, you'll need to prefix all commands that use the tools installed by mise with `mise x --`. For example, instead of running `pnpm install`, you would run `mise x -- pnpm install`.

#### Run the project

1. Clone the repo
	```bash
	git clone git@github.com:0xlebogang/sekrets.git
	```
	Or
	```bash
	git clone https://github.com/0xlebogang/sekrets.git
	```

2. Install tools using mise.
	```bash
	mise trust

	mise install
	```
	> All tools should be installed before cloning the project if you choose to do things manually.

3. Install project dependencies.
	```bash
	pnpm install
	```
	> This will install all dependencies, including the Go package dependencies too.

4. Configure environment variables.
	- Create copies of all `.env.exmaple` files in the subdirectories of the root [packages](./packages/) directory.
	- Rename each copy to `.env`
	- Edit the environment variables as necessary.

5. Run the external services needed by the backend (database, storage, etc)
	```bash
	pnpm turbo services:up
	```

6. Run all development servers.
	```bash
	pnpm run dev
	```

7. Access the application:
	| Name | Url |
	|------|-----|
	| API | http://localhost:8080 |

## Contributing

We welcome contributions from the community! If you're interested in contributing to Sekrets, please refer to our [CONTRIBUTING.md](./.github/contributing.md) guide for more information on how to get started.

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](./LICENSE) file for details.

Important: The AGPL-3.0 license applies exclusively to the **Sekrets** software itself. We do not repackage or redistribute any third-party libraries or dependencies. All external dependencies maintain their original licenses - please refer to their respective repositories and documentation for their specific license information.

---

<div align='center'>
	<sub>Developed with ❤️ by <a href="https://lebophoshoko.dedyn.io">Lebogang Phoshoko</a></sub>
</div>
