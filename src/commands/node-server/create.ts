import { Args, Command, Flags } from "@oclif/core";
// import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import fileHandler from "../../handlers/fileHandler2.js";

import authRule from "../../rules/node-server/_auth.json";
import userRule from "../../rules/node-server/_user.json";
import viewRule from "../../rules/node-server/_views.json";
import googleOauthRule from "../../rules/node-server/_gauth.json";

export default class NodeServerCreate extends Command {
	static description = "create a new node-server";

	static examples = ["<%= config.bin %> <%= command.id %>"];

	static flags = {
		// flag with a value (-n, --name=VALUE)
		user: Flags.boolean({ description: "This will add a userModel" }),
		auth: Flags.boolean({
			description:
				"This will implement basic authentication using jwt cookies",
		}),
		goauth: Flags.boolean({
			description: "This will basic authentication using google Oauth",
		}),
		view: Flags.boolean({
			description: "This will implement server-side rendering",
		}),
	};

	static args = {
		dir: Args.string({
			description: "Name or directory of the destination",
			required: true,
		}),
	};
	public async run(): Promise<void> {
		const { args, flags } = await this.parse(NodeServerCreate);

		const originalTemplatePath = path.join(
			__dirname,
			"../../../templates/node-server/original"
		);
		const optionalTemplatePath = path.join(
			__dirname,
			"../../../templates/node-server/optional"
		);

		const desDir = path.join(process.cwd(), args.dir);
		fs.copySync(originalTemplatePath, desDir);

		if (flags.user && !flags.auth) {
			await fileHandler(
				userRule,
				path.join(optionalTemplatePath, "user"),
				desDir
			);
		}
		if (flags.auth) {
			await fileHandler(
				authRule,
				path.join(optionalTemplatePath, "auth"),
				desDir
			);
		}
		if (flags.goauth) {
			await fileHandler(
				googleOauthRule,
				path.join(optionalTemplatePath, "googleOauth"),
				desDir
			);
		}
		if (flags.view) {
			await fileHandler(
				viewRule,
				path.join(optionalTemplatePath, "view"),
				desDir
			);
		}
		
		this.log(`Node Server created at ${desDir} `, "success");
	}
}
