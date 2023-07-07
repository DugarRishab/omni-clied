import fs from "fs-extra";
import path from "path";

const fileHandler = async (
	rule: {
		files: {
			required: {
				src: string;
				des: string;
			}[];
			deletes: string[];
			updates: {
				des: string;
				src?: string;
				strict?: boolean;
				flags: {
					start: string;
					end: string;
				};
				lines?: string[];
			}[];
		};
		dir?: {
			new?: string[];
			delete?: string[];
		};
	},
	templatesPath: string,
	desDir: string
) => {
	// checking dir
	rule.dir?.new?.forEach((dirname) => {
		const isDirPresent = fs.existsSync(path.join(desDir, dirname));

		if (!isDirPresent) {
			console.log("> dir created - ", dirname);
			fs.mkdirSync(path.join(desDir, dirname));
		}
	});

	// deleting not required files
	rule.files.deletes.forEach((file) => {
		const isFilePresent = fs.existsSync(path.join(desDir, file));
		// console.log(file, "-> ", isFilePresent);
		// console.log(path.join(desDir, file.des, file.src));

		if (isFilePresent) {
			fs.unlinkSync(path.join(desDir, file));
			console.log("> dir deleted - ", file);
		}
	});

	// checking required files
	rule.files.required.forEach((file) => {
		const isFilePresent = fs.existsSync(
			path.join(desDir, file.des, file.src)
		);
		if (!isFilePresent) {
			fs.copyFileSync(
				path.join(templatesPath, file.src),
				path.join(desDir, file.des, file.src)
			);
			console.log("> file created - ", file.des, file.src);
		}
	});

	// updating files
	rule.files.updates.forEach((update) => {
		// const srcFile = fs.readJSONSync(
		// 	path.join(templatesPath, update.src)
		// );
		let desFile = fs.readFileSync(path.join(desDir, update.des), "utf-8");
		// console.log(update.des, desFile.split(update.flags.start)[0]);
		// console.log(desFile.split(update.flags.end)[0]);
		let desSection = (!update.strict) ? desFile
			.split(update.flags.start)[1]
			.split(update.flags.end)[0] : "";
		// console.log(update.des, desSection);
		// desSection = update.flags.start + desSection;
		update.lines?.forEach((line) => {
			if (!desSection.includes(line)) desSection += line;
		});
		

		if (update.src) {
			const srcFile = fs.readFileSync(
				path.join(templatesPath, update.src),
				"utf-8"
			);
			let srcSection = srcFile
				.split(update.flags.start)[1]
				.split(update.flags.end)[0];

			desSection = desSection + srcSection;
		}

		desFile =
			desFile.split(update.flags.start)[0] +
			update.flags.start + 
			desSection +
			update.flags.end +
			desFile.split(update.flags.end)[1];
		fs.writeFileSync(path.join(desDir, update.des), desFile);
		console.log("> file updated - ", update.des);
	});

	const isDependenciesPresent = fs.existsSync(
		path.join(templatesPath, "dependencies.json")
	);

	if (isDependenciesPresent) {
		const dependencies = fs.readJSONSync(
			path.join(templatesPath, "dependencies.json")
		);
		const pack = fs.readJSONSync(path.join(desDir, "package.json")); // package.json
		pack.dependencies = {
			...pack.dependencies,
			...dependencies.dependencies,
		};

		fs.writeJSONSync(path.join(desDir, "package.json"), pack);
		console.log("> dependencies updated");
	}
};

export default fileHandler;
