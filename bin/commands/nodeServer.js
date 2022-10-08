import chalk from 'chalk';
import fs from 'fs-extra';
import { Server } from 'http';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const nodeServer = (options) => {
    createDir('./server');

    const server = path.join(
        __dirname,
        '../../lib/templates/node-server/original/'
    );
    fs.copySync(server, process.cwd() + '/server');
    // console.log(server);
    // console.log(options);
    // if (options.googleOauth) {
    //     // options.user = true;
    //     options.auth = true;
    // }

    if (options.user) {
        // Full path to the current directory
        const templatesPath = path.join(
            __dirname,
            '../../lib/templates/node-server/optional/user'
        );
        updateDir(templatesPath);
    }
    if (options.auth) {
        // Full path to the current directory
        const templatesPath = path.join(
            __dirname,
            '../../lib/templates/node-server/optional/auth'
        );
        updateDir(templatesPath);
    }
    if (options.googleOauth) {
        const templatesPath = path.join(
            __dirname,
            '../../lib/templates/node-server/optional/googleOauth'
        );
        console.log("promise", updateDir(templatesPath));
    }

    console.log(chalk.green('Node Server created by the name of `server`'));
};
const updateDir = async (templatesPath) =>
    fs.readdir(templatesPath, (err, files) => {
        if (err) {
            console.log('An error occured: ', err);
            process.exit(1);
        }
        // console.log(files);
        files.map((fileName) => {
            try {
                const src = path.join(templatesPath, '/' + fileName);
                let des;

                if (fileName.includes('Controller')) {
                    console.debug('Updating controller at: %s', fileName);
                    des = process.cwd() + '/server/controllers/' + fileName;
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
                fs.copyFileSync(src, des);
            } catch (err) {
                console.log(chalk.red('Error: ', err));
            }
        });
    });

const copyFile = (src, des) => {
    fs.copyFile(src, des);
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
