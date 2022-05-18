"use strict";
import Database from "../../mariadb.js";
import createStatements from "./createStatements.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

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
    host: process.env.DB_host,
    port: +process.env.DB_port,
    user: process.env.DB_admin,
    password: process.env.DB_adminpassword,
  };

  const DEBUG = createStatements.debug;
  const db = new Database(options);

  const user = `'${process.env.DB_user}'@'${process.env.DB_host}'`;
  const dropDatabaseSql = `drop database if exists ${process.env.DB_database}`;
  const createDatabaseSql = `create database ${process.env.DB_database}`;
  const dropUserSql = `drop user if exists ${user}`;
  const createUserSql =
    `create user if not exists ${user} ` +
    `identified by '${process.env.DB_password}'`;
  const grantPrivilegesSql = `grant all privileges on ${process.env.DB_database}.* to ${user}`;

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
          `create table ${process.env.DB_database}.${table.tableName}(` +
          `\n\t${table.columns.join(",\n\t")}` +
          ")";
        await db.doQuery(createTableSql);
        if (DEBUG) printStatements(createTableSql);
        if (table.data && table.data.length > 0) {
          const rows = [];
          for (let data of table.data) {
            const insertSql =
              `insert into ${process.env.DB_database}.${table.tableName} ` +
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
