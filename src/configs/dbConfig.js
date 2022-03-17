const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("database.sqli"), { fileMustExist: true });
if (db.open) {
  console.log(`Connected DBName:[${db.name}] DBState:[${db.open}]`);
} else {
  console.log(`Unable to connect DBName:[${db.name}] DBState:[${db.open}]`);
}
function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,
  run,
};