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

console.log(process.env.DB_host);

let db = new Database(options);
const dataStorage = new Datastorage();
app.all("*", (req, res) => {
  res.end("This is database for PHZ Full Stack NPS questionnaire");
});
app.post('/api/npsdata',(req,res)=>{
  const npsdata=req.body;
  dataStorage.insert(npsdata)
  .then(status=>res.json(status))
  .catch(err=>res.json(err));
});
server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
