"use strict";
import Database from "../mariadb.js";
import createStatements from "./createStatements.js";

const printMessage = (message) => {
  console.log(message);
};
const printStatements = (statement) => printMessage(`${statement};`);

const printError = (message) =>
  printMessage(`${"#".repeat(20)} Error ${"#".repeat(20)} ${message}`);

if (process.argv.length > 2) {
  createStatements = `./${process.argv[2]}`;
}

try {
  createDb(createStatements);
} catch (error) {
  console.log(error.message);
}

async function createDb(createStatements) {
  const options = {
    host: createStatements.host,
    port: createStatements.port,
    user: createStatements.admin,
    password: createStatements.adminpassword,
  };
  const DEBUG = createStatements.debug;
  const db = new Database(options);

  const user = `'${createStatements.user}'@'${createStatements.host}'`;
  const dropDatabaseSql = `drop database if exists ${createStatements.database}`;
  const createDatabaseSql = `create database ${createStatements.database}`;
  const dropUserSql = `drop user if exists ${user}`;
  const createUserSql =
    `create user if not exists ${user} ` +
    `identified by '${createStatements.userpassword}'`;
  const grantPrivilegesSql = `grant all privileges on ${createStatements.database}.* to ${user}`;

  try {
    await db.doQuery(dropDatabaseSql);
    if (DEBUG) printStatements(dropDatabaseSql);
    await db.doQuery(createDatabaseSql);
    if (DEBUG) printStatements(createDatabaseSql);
    if (createStatements.dropuser) {
      await db.doQuery(dropUserSql);
      if (DEBUG) printStatements(dropUserSql);
    }
    await db.doQuery(createUserSql);
    if (DEBUG) printStatements(createUserSql);

    await db.doQuery(grantPrivilegesSql);
    if (DEBUG) printStatements(grantPrivilegesSql);
    for (let table of createStatements.tables) {
      if (table.columns && table.columns.length > 0) {
        const createTableSql =
          `create table ${createStatements.database}.${table.tableName}(` +
          `\n\t${table.columns.join(",\n\t")}` +
          ")";
        await db.doQuery(createTableSql);
        if (DEBUG) printStatements(createTableSql);
        if (table.data && table.data.length > 0) {
          const rows = [];
          for (let data of table.data) {
            const insertSql =
              `insert into ${createStatements.database}.${table.tableName} ` +
              `values(${Array(data.length).fill("?").join(",")})`;
            rows.push(db.doQuery(insertSql, data));
          }
          await Promise.all(rows);
          if (DEBUG) printMessage("data added");
        } else {
          if (DEBUG) printMessage("data missing");
        }
      } else {
        if (DEBUG) printMessage("data missing");
      }
    }
  } catch (err) {
    printError(err.message);
  }
}
