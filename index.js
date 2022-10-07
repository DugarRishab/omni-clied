#! /usr/bin/env node

import { Command } from "commander";
import nodeServer from "./commands/nodeServer.js"

const program = new Command();

program
	.command("node-server")
	.description("Creates a template REST API using node and express")
	.option("--auth", "implements basic authentication and authorization. NOTE: `--user is required with this`")
	.option("--user", "implements a User Model and Controller")
	.action(nodeServer);
	
program
	.command("react")
	.description("Creates a template react app")
	.option("--redux", "Implemets redux for advanced state maangement")
	.action(nodeServer);

program.parse();