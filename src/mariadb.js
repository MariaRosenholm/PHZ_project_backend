import mysql from "promise-mysql";

export default class Database {
  createUnixSocketPool = async (config) => {
    const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

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
    console.log("this is pool in the ensureSchema: ", pool);
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
        console.log(
          "this is testing the ensureSchema: ",
          this.ensureSchema(pool)
        );
        await this.ensureSchema(pool);
        return pool;
      })
      .catch((err) => {
        console.log(err.stack);
        return "Error";
      });
}
