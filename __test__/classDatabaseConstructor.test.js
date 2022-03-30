"use strict";

import Database from "../src/mariadb.js";

describe("constructor tests", () => {
  test("1. Give correct options to the database ", () => {
    let options = {
      host: "localhost",
      port: 3306,
      user: "Test",
      password: "1234",
      database: "questionnaire",
      allowPublicKeyRetrieval: true,
    };

    const db = new Database(options);

    expect(db.options).toEqual(options);
  });

  test("2. No options given to the database", () => {
    expect(() => new Database()).toThrow("Options missing!");
  });

  test("3. Port in the options not defined", () => {
    let options = {
      host: "localhost",
      user: "Test",
      password: "1234",
      database: "questionnaire",
      allowPublicKeyRetrieval: true,
    };

    expect(() => new Database(options)).toThrow("Port missing!");
  });

  test("4. Port in the options empty", () => {
    let options = {
      host: "localhost",
      port: "",
      user: "Admin",
      password: "secret",
      database: "questionnaire",
      allowPublicKeyRetrieval: true,
    };

    expect(() => new Database(options)).toThrow("Port missing!");
  });
});
