import sqlite from 'sqlite';
import * as fs from 'fs-extra';
import config from '../config';

export default class SqliteHelper {
    static db: sqlite.Database;

    static async createDb() {
        let isExist = fs.pathExistsSync(config.dbPath);
        SqliteHelper.db = await sqlite.open(config.dbPath);
        if (!isExist) {
            let sql = await fs.readFile(config.sqlPath, "utf-8");
            SqliteHelper.db.exec(sql);
        }
    }
}

export const db = SqliteHelper.db;