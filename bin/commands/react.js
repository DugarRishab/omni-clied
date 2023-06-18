import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';
import fileHandler from '../handlers/node-server/fileHandler.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const reactApp = async (options) => {
    createDir('./server');

    const server = path.join(
        __dirname,
        '../../lib/templates/react-app/original'
    );
    fs.copySync(server, process.cwd() + '/react-app');

    let templatesPath = path.join(
        __dirname,
        '../../lib/templates/react-app/optional'
    );

    console.log(chalk.green('React App created by the name of `react-app`'));
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
export default reactApp;
