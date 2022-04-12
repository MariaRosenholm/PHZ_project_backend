import express from "express";
import cors from "cors";
import Database from "./mariadb.js";
import http from "http";
import dotenv from "dotenv";
import Datastorage from "./storage/dataStorageLayer.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const host = "localhost";
const port = 3010;

app.use(cors());
app.use(express.json());

let options = {
  host: process.env.DB_host,
  port: +process.env.DB_port,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database: process.env.DB_database,
  allowPublicKeyRetrieval: true,
};


//let db = new Database(options);
const dataStorage = new Datastorage();

app.post("/api/npsdata", (req, res) => {
  const npsdata = req.body;
  dataStorage
    .insert(npsdata)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});
app.get('/api/npsdata',(req,res)=>
dataStorage.getAll().then(result=>     
      res.json(result))
    .catch(err=>res.json(err)));

app.all("*", (req, res) => {
  res.end("This is database for PHZ Full Stack NPS questionnaire");
});

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
export default app;

