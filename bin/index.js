#! /usr/bin/env node

import { Command } from "commander";
import nodeServer from "./commands/nodeServer.js"

const program = new Command();

program
	.command("node-server")
	.description("Creates a template REST API using node and express")
	.option("--auth", "Implements JWT authentication and authorization using cookies.")
	.option("--user", "Implements a User Model and Controller")
	.option("--google-oauth", "Implements google oauth2 along with JWT authentication")
	.option("--view", "Implements a view controller for server-side rendering")
	.action(nodeServer);
	
// program
// 	.command("react-app")
// 	.description("Creates a template react app")
// 	.option("--redux", "Implemets redux for advanced state maangement")
// 	.option("--auth", "Includes a login and signup page")
// 	.option("--google-oauth", "Implements google OAuth")
// 	.action(reactApp);

program.parse();