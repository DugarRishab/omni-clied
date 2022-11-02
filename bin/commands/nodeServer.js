import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';
import fileHandler from '../handlers/node-server/fileHandler.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const nodeServer = async (options) => {
    createDir('./server');

    const server = path.join(
        __dirname,
        '../../lib/templates/node-server/original'
    );
    fs.copySync(server, process.cwd() + '/server');

    let templatesPath = path.join(__dirname, '../../lib/templates/node-server/optional');

    if (options.user && !options.auth) {
        templatesPath = path.join(
            __dirname,
            '../../lib/templates/node-server/optional/user'
        );
        await fileHandler(options, templatesPath)
    }
    if (options.auth) {
        templatesPath = path.join(
            __dirname,
            '../../lib/templates/node-server/optional/auth'
        );
        await fileHandler(options, templatesPath);
    }
    if (options.googleOauth) {  
        templatesPath = path.join(
            __dirname,
            '../../lib/templates/node-server/optional/googleOauth'
        );
        await fileHandler(options, templatesPath);
    }
    if (options.view) {
        templatesPath = path.join(
            __dirname,
            '../../lib/templates/node-server/optional/views'
        );
        await fileHandler(options, templatesPath);
    }

    console.log(chalk.green('Node Server created by the name of `server`'));
};

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
