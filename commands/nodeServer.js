import chalk from 'chalk';
import fs from 'fs-extra';
import { Server } from 'http';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const nodeServer = (options) => {
    createDir('./server');

    const server = path.join(__dirname, '../templates/node-server/original/');
    fs.copySync(server, process.cwd() + '/server');
    // console.log(server);
	// console.log(options);
	
	let templatesPath;

	if (options.user) {
        // Full path to the current directory
        templatesPath = path.join(
            __dirname,
            '../templates/node-server/optional/user'
        );
    }
	if (options.auth) {
        // Full path to the current directory
        templatesPath = path.join(
            __dirname,
            '../templates/node-server/optional/auth'
        );
    }

    if (options.user || options.auth) {
        // Reads all the files in a directory
        fs.readdir(templatesPath, (err, files) => {
            if (err) {
                console.log('An error occured: ', err);
                process.exit(1);
            }
            // console.log(files);
            files.map((fileName) => {
                if (fileName.includes('Controller')) {
                    console.debug('Updating controller at: %s', fileName);
                    fs.copyFileSync(
                        path.join(templatesPath, '/' + fileName),
                        process.cwd() + '/server/controllers/' + fileName
                    );
				}
				else if (fileName.includes('Routes')) {
                    console.debug('Updating routers at: %s', fileName);
                    fs.copyFileSync(
                        path.join(templatesPath, '/' + fileName),
                        process.cwd() + '/server/routes/' + fileName
                    );
				}
				else if (fileName.includes('Model')) {
                    console.debug('Updating models at: %s', fileName);
                    fs.copyFileSync(
                        path.join(templatesPath, '/' + fileName),
                        process.cwd() + '/server/models/' + fileName
                    );
				}
				else {
                    console.debug('Updating %s', fileName);
                    fs.copyFileSync(
                        path.join(templatesPath, '/' + fileName),
                        process.cwd() + '/server/' + fileName
                    );
                }
            });
        });
    }
};

const copyFile = (src, des) => {
    fs.copySync(src, des, (error) => {
        if (error) console.log('An error occured: ', error);
    });
};

const createDir = (dirPath) => {
    fs.mkdirSync(dirPath, { recursive: true }, (error) => {
        if (error) console.log('An error occured: ', error);
        else console.log('Your directory is made!');
    });
};

const createFile = (filePath, fileContent) => {
    fs.writeFile(process.cwd() + filePath, fileContent, (error) => {
        if (error) console.log('An error occured: ', error);
        else console.log('Your file is made!');
    });
};

// module.exports = nodeServer;
export default nodeServer;
