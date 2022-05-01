import mysql from "promise-mysql";

export default class Database {
  createUnixSocketPool = async (config) => {
    console.log(
      "this is socket path in env file, this should be undefined: ",
      process.env.DB_SOCKET_PATH
    );
    const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

    console.log("this is given socket path: ", dbSocketPath);
    console.log(
      "this is connection nanme in env file: ",
      process.env.INSTANCE_CONNECTION_NAME
    );

    return mysql.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      socketPath: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
      ...config,
    });
  };

  createPool = async () => {
    const config = {
      connectionLimit: 5,
      connectTimeout: 10000, // 10 seconds
      acquireTimeout: 10000, // 10 seconds
      waitForConnections: true, // Default: true
      queueLimit: 0, // Default: 0
    };

    return this.createUnixSocketPool(config);
  };

  ensureSchema = async (pool) => {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS npsdata
        ( id integer not null primary key, date varchar(15) not null,
        score integer not null, feedback varchar(150) not null );`
    );
    console.log("Ensured that table 'npsdata' exists");
  };

  createPoolAndEnsureSchema = async () =>
    await this.createPool()
      .then(async (pool) => {
        console.log("this is the pool in the mariadb.js: ", pool);
        await this.ensureSchema(pool);
        return pool;
      })
      .catch((err) => {
        return "Error";
      });
}
