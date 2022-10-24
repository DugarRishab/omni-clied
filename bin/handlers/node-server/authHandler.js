import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

const authHandler = async (options, templatesPath) => {
    const change = fs.readJSONSync(path.join(templatesPath, 'changes.json'));

    // console.log(typeof change);
    // console.log(change);


    change.dir.new.forEach((dirname) => {
        const isDirPresent = fs.existsSync(
            path.join(process.cwd(), 'server', dirname)
        );

        if (!isDirPresent) {
            console.log('dir created - ', dirname);
            fs.mkdirSync(path.join(process.cwd(), 'server', dirname));
        }
    });

    change.files.deletes.forEach((fileName) => {

        let des = desPath(fileName);

        const isFilePresent = fs.existsSync(des);
        console.log(fileName, '-> ', isFilePresent);

        if (isFilePresent) {
            fs.unlinkSync(des);
        }
    })

    change.files.overwrites.forEach((fileName) => {
        const src = path.join(templatesPath, fileName);
        // console.log(srcFile);

        let des = desPath(fileName);

        const isFilePresent = fs.existsSync(des);
        console.log(fileName, '-> ', isFilePresent);

        if (!isFilePresent) {
            fs.copyFileSync(src, des);
        }
    });

    change.files.updates.forEach((update) => {
        const srcFile = fs.readJSONSync(
            path.join(templatesPath, update.srcFilename)
        );
        // console.log(srcFile);
        let des = desPath(update.desFilename);
        let desFile = fs.readFileSync(des, 'utf-8');
        // console.log(desFile);

        srcFile.forEach((line) => {
            const code = line.code.substring(1);
            const sign = line.code.substring(0, 1);

            console.log(desFile.includes(code));
            console.log(line.lines);

            if (line.lines) {
                if (!desFile.includes(line.lines)) {
                    // desFile.concat();
                    if (code.length === 0) {
                        desFile =
                            (sign === '-' ? line.lines : '') +
                            desFile +
                            (sign === '+' ? line.lines : '');
                    } else {
                        desFile =
                            desFile.split(code)[0] +
                            (sign === '+' ? code : '') +
                            line.lines +
                            (sign === '-' ? code : '') +
                            desFile.split(code)[1];
                    }
                }
            } else if (line.files) {
                const lines = fs.readFileSync(
                    path.join(templatesPath, line.files),
                    'utf-8'
                );

                if (!desFile.includes(lines)) {
                    // desFile.concat();
                    if (code.length === 0) {
                        desFile =
                            (sign === '-' ? lines : '') +
                            desFile +
                            (sign === '+' ? lines : '');
                    } else {
                        desFile =
                            desFile.split(code)[0] +
                            (sign === '+' ? code : '') +
                            lines +
                            (sign === '-' ? code : '') +
                            desFile.split(code)[1];
                    }
                }
            }

            fs.writeFileSync(des, desFile);
        });
    });

    const isDependenciesPresent = fs.existsSync(
        path.join(templatesPath, 'dependencies.json')
    );

    if (isDependenciesPresent) {
        const dependencies = fs.readJSONSync(
            path.join(templatesPath, 'dependencies.json')
        );
        const pack = fs.readJSONSync(
            path.join(process.cwd(), 'server', 'package.json')
        ); // package.json
        pack.dependencies = {
            ...pack.dependencies,
            ...dependencies.dependencies,
        };

        fs.writeJSONSync(
            path.join(process.cwd(), 'server', 'package.json'),
            pack
        );
    }
};

const desPath = (fileName) => {
    let des;
    if (fileName.includes('Controller')) {
        console.debug('Creating controller at: %s', fileName);
        des = path.join(process.cwd() + '/server/controllers/' + fileName);
    } else if (fileName.includes('Routes')) {
        console.debug('Creating routers at: %s', fileName);
        des = path.join(process.cwd() + '/server/routes/' + fileName);
    } else if (fileName.includes('Model')) {
        console.debug('Creating models at: %s', fileName);
        des = path.join(process.cwd() + '/server/models/' + fileName);
    } else if (fileName.includes('Utils')) {
        console.debug('Creating utils at: %s', fileName);
        des = path.join(process.cwd() + '/server/utils/' + fileName);
    } else if (fileName.includes('View')) {
        console.debug('Updating views at: %s', fileName);
        des = process.cwd() + '/server/views/' + fileName;
    } else {
        console.debug('Creating %s', fileName);
        des = path.join(process.cwd() + '/server/' + fileName);
    }
    return des;
}

export default authHandler;
