const fs = require('fs');
const path = require('path');
const util = require('util');
const uuid = require('uuid/v4');

class DB {

    constructor(dbPath) {
        this._dbPath = dbPath;
        this._dbName = 'db.json';
        this._filePath = path.join(this._dbPath, this._dbName);

        this._createDirIfNotExist();
        this._createDbIfNotExist();

        return {
            getItems: this.getItems.bind(this),
            createItem: this.createItem.bind(this)
        };
    }

    async getItems() {
        const readFileAsync = util.promisify(fs.readFile);

        try {
            const data = await readFileAsync(this._filePath);
            return JSON.parse(data.toString());
        } catch (e) {
            console.error(e);
        }
    }

    async getItem(id) {
        try {
            return await this.getItems().find(item => item.id === id);
        } catch (e) {
            console.error(e);
        }
    }

    async createItem(data) {
        const writeFileAsync = util.promisify(fs.writeFile);
        const items = await this.getItems();
        const item = {
            id: uuid(),
            ...data
        };
        items.push(item);

        try {
            await writeFileAsync(this._filePath, JSON.stringify(items));
            return item;
        } catch (e) {
            console.error(e);
        }
    }

    async deleteItem(id) {
        const writeFileAsync = util.promisify(fs.writeFile);
        const items = await this.getItems();
        const filteredItems = items.filter(i => i.id !== id);

        try {
            await writeFileAsync(this._filePath, JSON.stringify(filteredItems));
            return id;
        } catch (e) {
            console.error(e);
        }
    }

    async updateItem(id, data) {
        const writeFileAsync = util.promisify(fs.writeFile);
        const items = await this.getItems();
        const itemIndex = items.findIndex(item => item.id === id);
        items[itemIndex] = {id, ...data};

        try {
            await writeFileAsync(this._filePath, JSON.stringify(items));
            return items[itemIndex];
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
        const isFileExist = fs.existsSync(this._filePath);

        if (!isFileExist) {
            fs.writeFileSync(this._filePath, JSON.stringify([]));
        }
    }
}

module.exports = DB;
