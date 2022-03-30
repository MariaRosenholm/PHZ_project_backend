"use strict";

import Database from "../src/mariadb.js";
import dotenv from "dotenv";

dotenv.config();

describe("doQuery tests", () => {
  let options = {
    host: process.env.DB_host,
    port: +process.env.DB_port,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
    allowPublicKeyRetrieval: true,
  };

  const db = new Database(options);

  test("1. With correct sql and parameters", async () => {
    let testEmployeeID;
    let mariadbAnswer;

    async function callback() {
      testEmployeeID = Math.floor(Math.random() * 500);
      await db
        .doQuery(
          "insert into nps_data (employeeid,date,score,feedback) values (?,?,?,?)",
          [testEmployeeID, "2022-03-29", 10, "Testing"]
        )
        .then((result) => result)
        .catch((err) => console.log("Error in inserting: " + err));
    }

    await callback();

    await db
      .doQuery("select * from nps_data where employeeid = ?", [testEmployeeID])
      .then((result) => (mariadbAnswer = result.queryResult[0]))
      .catch((err) => console.log("Error fetching: " + err));

    return await expect(mariadbAnswer.score).toBe(10);
  });

  test("2. Without correct sql", () => {
    return expect(db.doQuery(["Antti", "salasana"])).rejects.toMatch(
      "SQL-error"
    );
  });
});
