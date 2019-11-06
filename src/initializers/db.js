const fs = require('fs');
const path = require('path');
const util = require('util');

class DB {

    constructor(path) {
        this._dbPath = path;
        this._dbName = 'db.json';

        this._createDirIfNotExist();
        this._createDbIfNotExist();

        return {getItems: this.getItems.bind(this)};
    }

    async getItems() {
        const dbPath = path.join(this._dbPath, this._dbName);
        const readFileAsync = util.promisify(fs.readFile);

        try {
            const data = await readFileAsync(path.join(dbPath));
            return await JSON.parse(data);
        } catch (e) {
            console.error(e);
        }
    }

    _createDirIfNotExist() {
        const dirPath = path.join(this._dbPath);
        const isDirExist = fs.existsSync(dirPath);

        if (!isDirExist) {
            fs.mkdirSync(dirPath);
        }
    }

    _createDbIfNotExist() {
        const filePath = path.join(this._dbPath, this._dbName);
        const isFileExist = fs.existsSync(filePath);

        if (!isFileExist) {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }
    }
}

module.exports = DB;
