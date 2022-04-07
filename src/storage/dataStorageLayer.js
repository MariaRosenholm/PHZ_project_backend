"use strict";
import Database from "../mariadb.js";
import options from "./databaseOptions.js";

import { CODES, TYPE, MESSAGES } from "./phz_statuscodes.js";
import sql from "./phz_sqlqueries.js";
import { toArrayInsert } from "./parameters.js";

const insertSql = sql.insert.join(" ");

const PRIMARY_KEY = sql.primaryKey;

export default class Datastorage {
  constructor() {
    this.db = new Database(options);
  }
  get CODES() {
    return CODES;
  }

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
