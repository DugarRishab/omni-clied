import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

const googleOAuthHandler = async (options, templatesPath) => {
	templatesPath = path.join(templatesPath, '/googleOauth');
	fs.readdir(templatesPath, (err, files) => {
        if (err) {
            console.log('An error occured: ', err);
            process.exit(1);
        }
        // console.log(files);
        files.map((fileName) => {
            try {
				if (!options.auth) {
					if (!fileName.startsWith("COPY___")) {
						const src = path.join(templatesPath, '/' + fileName);
                        let des;

                        if (fileName.includes('Controller')) {
                            console.debug(
                                'Creating controller at: %s',
                                fileName
                            );
                            des =
                                process.cwd() +
                                '/server/controllers/' +
                                fileName;
                        } else if (fileName.includes('Routes')) {
                            console.debug('Creating routers at: %s', fileName);
                            des = process.cwd() + '/server/routes/' + fileName;
                        } else if (fileName.includes('Model')) {
                            console.debug('Creating models at: %s', fileName);
                            des = process.cwd() + '/server/models/' + fileName;
                        } else if (fileName.includes('Utils')) {
                            console.debug('Creating utils at: %s', fileName);
                            des = process.cwd() + '/server/utils/' + fileName;
                        } else {
                            console.debug('Creating %s', fileName);
                            des = process.cwd() + '/server/' + fileName;
                        }
                        fs.copyFileSync(src, des);
					}
                    
				}
				else {
					if (fileName.startsWith("COPY___")) {
						const src = path.join(templatesPath, '/' + fileName);
						fileName = fileName.split("___")[1];
						
                        let des;

                        if (fileName.includes('Controller')) {
                            console.debug(
                                'Updating controller at: %s',
                                fileName
                            );
                            des =
                                process.cwd() +
                                '/server/controllers/' +
                                fileName;
                        } else if (fileName.includes('Routes')) {
                            console.debug('Updating routers at: %s', fileName);
                            des = process.cwd() + '/server/routes/' + fileName;
                        } else if (fileName.includes('Model')) {
                            console.debug('Updating models at: %s', fileName);
                            des = process.cwd() + '/server/models/' + fileName;
                        } else if (fileName.includes('Utils')) {
                            console.debug('Updating utils at: %s', fileName);
                            des = process.cwd() + '/server/utils/' + fileName;
                        } else {
                            console.debug('Updating %s', fileName);
                            des = process.cwd() + '/server/' + fileName;
						}
						
						const contents = fs.readFileSync(src);

						fs.appendFileSync(des, contents, { flags: 'a+' });
					}
				}
            } catch (err) {
                console.log(chalk.red('Error: ', err));
            }
        });
    });
    
    
};

export default googleOAuthHandler;
