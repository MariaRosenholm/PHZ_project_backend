"use strict";
import Database from "../mariadb.js";
import { CODES, MESSAGES } from "./phz_statuscodes.js";
import sql from "./phz_sqlqueries.js";
import { toArrayInsert } from "./parameters.js";
import dotenv from "dotenv";

dotenv.config();

const insertSql = sql.insert.join(" ");
const getAllSql = sql.getAll.join(" ");
const PRIMARY_KEY = sql.primaryKey;
const getDataBetweenDatesSql = sql.getDataBetweenDates.join(" ");

const options = {
  host: process.env.DB_host,
  port: +process.env.DB_port,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database: process.env.DB_database,
  allowPublicKeyRetrieval: true,
};

export default class Datastorage {
  constructor() {
    this.db = new Database(options);
  }
  get CODES() {
    return CODES;
  }
  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getAllSql);
        resolve(result.queryResult);
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  } // end of getAll

  getDataBetweenDates(startDate, endDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getDataBetweenDatesSql, [
          startDate,
          endDate,
        ]);
        resolve(result.queryResult);
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  } // end of getDataBetweenDates
  insert(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db.doQuery(insertSql, toArrayInsert(resource));
        resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
      } catch (error) {
        console.log(error);
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  } //end of insert
}
