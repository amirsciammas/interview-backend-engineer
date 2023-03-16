import sqlite3 from 'sqlite3';
import path from 'path';

class Database {
  private readonly db: sqlite3.Database;

  constructor() {
    const filePath = path.join(__dirname, '../../', 'database.sqlite');
    this.db = new sqlite3.Database(filePath, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the database.');
    });    
  }

  public close() {
    this.db.close();
  }

  public all(sql: string, params?: any[]) {
    return new Promise<any[]>((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public get(sql: string, params?: any) {
    return new Promise<any>((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

export default new Database();

