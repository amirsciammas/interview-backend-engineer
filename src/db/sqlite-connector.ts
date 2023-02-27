import sqlite3 from "sqlite3";
import { open } from 'sqlite';
import * as fs from 'fs'

let dbFile = 'database.db';
export async function db_connect() {
    let dbExists = fs.existsSync(dbFile);
    if (!dbExists) {
        fs.openSync(dbFile, 'w');
    }

    return open({
        filename: dbFile,
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE
    })
}

