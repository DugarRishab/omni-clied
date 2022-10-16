import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';
import userHandler from '../handlers/node-server/userHandler.js';
import authHandler from '../handlers/node-server/authHandler.js';
import viewHandler from '../handlers/node-server/viewHandler.js';
import googleOAuthHandler from '../handlers/node-server/googleOAuthHandler.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const nodeServer = async (options) => {
    createDir('./server');

    const server = path.join(
        __dirname,
        '../../lib/templates/node-server/original'
    );
    fs.copySync(server, process.cwd() + '/server');

    const templatesPath = path.join(__dirname, '../../lib/templates/node-server/optional');

    if (options.user && !options.auth) {
        await userHandler(options, templatesPath)
    }
    if (options.auth) {
        await authHandler(options, templatesPath);
    }
    if (options.googleOauth) {  
        await googleOAuthHandler(options, templatesPath);
    }
    if (options.views) {
        await viewHandler(options, templatesPath);
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
