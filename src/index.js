import express from "express";
import cors from "cors";
import http from "http";
import Datastorage from "./storage/dataStorageLayer.js";

const app = express();
const server = http.createServer(app);
const host = "localhost";
const port = 3010;

app.use(cors());
app.use(express.json());

const dataStorage = new Datastorage();

app.post("/api/npsdata", (req, res) => {
  const npsdata = req.body;
  dataStorage
    .insert(npsdata)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});
app.get("/api/npsdata", (req, res) =>
  dataStorage
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.get("/api/npsdata/:startDate/:endDate", (req, res) =>
  dataStorage
    .getDataBetweenDates(req.params.startDate, req.params.endDate)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);
app.all("*", (req, res) => {
  res.end("This is database for PHZ Full Stack NPS questionnaire");
});

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
export default app;
