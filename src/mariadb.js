import mariadb from "mariadb";

export default class Database {
  constructor(options) {
    if (!options) throw Error("Options missing!");
    if (!options.port || String(options.port).trim() === "")
      throw Error("Port missing!");

    this.options = options;
    this.options.port = Number(options.port);
    this.options.allowPublicKeyRetrieval = true;
  }

  doQuery(sql, parameters) {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await mariadb.createConnection(this.options);
        let queryResult = await connection.query(sql, parameters);
        console.log('reached',queryResult);
        if (typeof queryResult === "undefined") {
          reject("Query Error");
        } else if (typeof queryResult.affectedRows === "undefined") {
          delete queryResult.meta;
          resolve({ queryResult, resultSet: true });
        } else {
          resolve({
            queryResult: {
              rowsChanged: queryResult.affectedRows,
              insertId: queryResult.insertId,
              status: queryResult.warningStatus,
            },
            resultSet: false,
          });
        }
      } catch (err) {
        reject("SQL-error");
      } finally {
        if (connection) connection.end();
      }
    });
  }
}
