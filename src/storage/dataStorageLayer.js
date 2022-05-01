"use strict";
import Database from "../mariadb.js";
import { CODES, MESSAGES } from "./phz_statuscodes.js";
import sql from "./phz_sqlqueries.js";
import { toArrayInsert } from "./parameters.js";

const insertSql = sql.insert.join(" ");
const getAllSql = sql.getAll.join(" ");
const PRIMARY_KEY = sql.primaryKey;
const getDataBetweenDatesSql = sql.getDataBetweenDates.join(" ");

export default class Datastorage {
  constructor() {
    this.db = new Database();
    this.pool = "Not set";
  }
  get CODES() {
    return CODES;
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.pool === "Error" || "Not set") {
          let pool1 = this.db.createPoolAndEnsureSchema();
          this.pool = await pool1;
        }
        const result = this.pool.query(getAllSql);
        resolve(result);
      } catch (err) {
        reject(err.stack);
      }
    });
  } // end of getAll

  getDataBetweenDates(startDate, endDate) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.pool === "Error" || "Not set") {
          let pool1 = this.db.createPoolAndEnsureSchema();
          this.pool = await pool1;
        }

        const result = await this.pool.query(getDataBetweenDatesSql, [
          startDate,
          endDate,
        ]);
        console.log(result);
        resolve(result);
      } catch (err) {
        console.log(err.stack);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  } // end of getDataBetweenDates
  insert(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.pool === "Error" || "Not set") {
          let pool1 = this.db.createPoolAndEnsureSchema();
          this.pool = await pool1;
        }
        await this.pool.query(insertSql, toArrayInsert(resource));
        resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
      } catch (error) {
        console.log(error);
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  } //end of insert
}
