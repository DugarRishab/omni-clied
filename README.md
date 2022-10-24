# omni-clied

omni-clied or just *omni* is a tool that helps you develop applications fast and efficiently. You can use the application made by this tool as it is or use it as a template to avoid writing all those repetitive functions and boost your productivity.

You might have noticed you are copying a lot of code from your previous projects. This reduces your productivity and takes up a lot of time. So, use templates created by omni-clied to boost your speed and efficiency. 

## Installation 

Either try cloning with git or by **npm** (recommended)

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

## Usage

omni-clied creates a template based on your choices. Your choices can be passed as arguments. 

Basic usage: 
```sh
	omni [the-app-you-want] [options]
```

To create a node server with google OAuth pre-implemented: 
```sh
	omni node-server --google-oauth
```
This will create a node server named '**server**' inside the root directory of your terminal. This server will have all functions required for google oAuth2.0.

An empty `config.env` file will be created inside the server which needs to be filled before running the server.

After the `config.env` file is updated accordingly, the server can be used as it is or can be used as a template for larger projects. 

To see all available commands:
```sh
	omni --help
```
Or to see all available options: 
```sh
	omni node-server --help
```

## Note: 

Currently, omni-clied only supports `node-server` but support for more applications will be released soon. 

If you have an idea you would like us to add or you found a bug, please add them on the [issues](https://github.com/DugarRishab/omni-clied/issues) page of our Github. You can also write to me directly on this [email](mailto:www.anitadugar9163@gmail.com)

