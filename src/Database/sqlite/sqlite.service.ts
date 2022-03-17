import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require('sqlite3').verbose();
let sqliteDB: any = null;
interface queryPramType {
  [key: string]: any;
}

@Injectable()
export class SqliteService implements OnModuleInit, OnModuleDestroy {
  constructor() {
    sqliteDB = null;
  }
  /**
   * Connect with Database.
   * @param path
   * @returns success message of operation.
   */
  private open(path: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      sqliteDB = new sqlite3.Database(path, function (err: Error) {
        if (err) reject('Open error: ' + err.message);
        else resolve(path + ' opened');
      });
    });
  }

  /**
   * For UPDATE, INSERT, DELETE query.
   * @param query
   * @returns true or error message.
   */
  run(query: string, params: queryPramType = {}): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      sqliteDB.run(query, params, function (err: Error) {
        if (err) reject(err.message);
        else resolve(true);
      });
    });
  }

  /**
   * For first row read.
   * @param query
   * @param params
   * @returns first row
   */
  get<Type>(query: string, params: queryPramType = {}): Promise<Type> {
    return new Promise(function (resolve, reject) {
      sqliteDB.get(query, params, function (err: Error, row: Type) {
        if (err) reject('Read error: ' + err.message);
        else {
          resolve(row);
        }
      });
    });
  }

  /**
   * For set of rows read.
   * @param query
   * @param params
   * @returns
   */
  all<Type>(
    query: string,
    params: queryPramType | [] = {},
  ): Promise<Array<Type>> {
    return new Promise(function (resolve, reject) {
      sqliteDB.all(query, params, function (err: Error, rows: Array<Type>) {
        if (err) reject('Read error: ' + err.message);
        else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * close DB connection.
   * @returns
   */
  private close(): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      try {
        if (sqliteDB) sqliteDB.close();
        resolve(true);
      } catch (Error) {
        reject(Error.message);
      }
    });
  }

  async onModuleInit() {
    //console.log('On module init called');
    try {
      await this.open('database.sqli');
      console.log('Opening DB');
    } catch (Error) {
      console.log(Error);
      console.log(Error.message);
    }
  }

  async onModuleDestroy() {
    //console.log('On module destroy called');
    try {
      this.close();
    } catch (Error) {
      console.log(Error.message);
    }
  }
}
