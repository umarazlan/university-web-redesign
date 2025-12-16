const fs = require('fs').promises;
const path = require('path');

class JsonDb {
    constructor(filename) {
        this.filepath = path.join(__dirname, '../data', filename);
        this.init();
    }

    async init() {
        try {
            await fs.access(this.filepath);
        } catch {
            await fs.writeFile(this.filepath, JSON.stringify([], null, 2));
        }
    }

    async read() {
        try {
            const data = await fs.readFile(this.filepath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async write(data) {
        await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
    }

    async find() {
        return await this.read();
    }

    async findById(id) {
        const data = await this.read();
        return data.find(item => item.id === id);
    }

    async create(item) {
        const data = await this.read();
        data.push(item);
        await this.write(data);
        return item;
    }

    async update(id, updates) {
        const data = await this.read();
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return null;

        data[index] = { ...data[index], ...updates };
        await this.write(data);
        return data[index];
    }

    async delete(id) {
        const data = await this.read();
        const filtered = data.filter(item => item.id !== id);
        await this.write(filtered);
        return true;
    }

    async findOne(predicate) {
        const data = await this.read();
        return data.find(predicate);
    }
}

module.exports = JsonDb;
