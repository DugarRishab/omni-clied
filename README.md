# Omni-clied 2.0

![logo](./assets/omni%20logo/omni-high-resolution-logo-white-on-transparent-background.png)

Omni (or Omni-CLIed) is a powerful command-line interface (CLI) tool designed to streamline the process of creating fully functional Node.js servers and React.js applications. With Omni, you can generate server-side code that comes prepackaged with essential features like Google OAuth or customizable JSON Web Token (JWT) authentication and user models.

By leveraging Omni's intuitive and efficient CLI commands, developers can rapidly scaffold and initialize new projects, saving valuable time and effort. Whether you're starting a new web application or adding server functionality to an existing project, Omni empowers you to quickly set up secure and scalable server-side infrastructure.

Omni's seamless integration with Node.js and React.js allows developers to effortlessly create the server and client components required for modern web applications. The generated server code includes robust authentication options, such as Google OAuth or the flexibility to implement your own JWT-based authentication system. This makes it easy to authenticate and manage user accounts within your application.

With Omni, you can focus more on building the core features of your application rather than spending time on repetitive setup tasks. By automating the process of generating server-side and client-side code, Omni enables developers to jumpstart their projects and deliver high-quality applications faster.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/DugarRishab/omni-clied/blob/main/LICENSE)


<!-- toc -->
* [Omni-clied 2.0](#omni-clied-20)
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
* [Note:](#note)
<!-- tocstop -->

# Installation 

Ypu can use it directly via npx: 
```sh
  npx omni-clied node-server create [DIR]
```

or you can install it either by cloning with git or by **npm** (recommended)

To install via npm:
```sh
	npm i -g omni-clied
```
And omni-clied will be installed globally to your system path. 

With a local installation, omni-clied will not be available in your system path or you can't use it directly from the command line. Instead, the local installation of omni-clied can be run by calling it from within an npm script (such as `npm start`) or using npx.

To install via yarn: 
```sh
	yarn global add omni-clied
```
To clone with git: 
```sh
	git clone https://github.com/DugarRishab/omni-clied
```

# Usage

omni-clied creates a template based on your choices. Your choices can be passed as flags.

Basic usage: 
```sh
	omni-clied [the-app-you-want] create [DIR] [options]
```

To create a node server with google OAuth pre-implemented: 

```sh
	omni-clied node-server create new-server --google-oauth
```

This will create a node server named '**new-server**' inside the root directory of your terminal. This server will have all functions required for google oAuth2.0.

An empty `config.env` file will be created inside the server which needs to be filled before running the server.

After the `config.env` file is updated accordingly, the server can be used as it is or can be used as a template for larger projects. 

To see all available commands:
```sh
	omni-clied --help
```
Or to see all available options: 
```sh
	omni-clied node-server --help
```
# Commands

## `omni-clied help [COMMANDS]`

Display help for omni.

```
USAGE
  $ omni-clied help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for omni.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `omni-clied node-server create DIR`

create a new node-server

```
USAGE
  $ omni-clied node-server create DIR [--user] [--auth] [--goauth] [--view]

ARGUMENTS
  DIR  Name or directory of the destination

FLAGS
  --auth    This will implement basic authentication using jwt cookies
  --goauth  This will basic authentication using google Oauth
  --user    This will add a userModel
  --view    This will implement server-side rendering

DESCRIPTION
  create a new node-server

EXAMPLES
  $ omni node-server create
```

# Note: 

Currently, omni-clied only supports `node-server` but support for more applications will be released soon. 

If you have an idea you would like us to add or you found a bug, please add them on the [issues](https://github.com/DugarRishab/omni-clied/issues) page of our Github. You can also write to me directly on this [email](mailto:www.anitadugar9163@gmail.com)
