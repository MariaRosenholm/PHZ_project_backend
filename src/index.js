import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Datastorage from "./storage/dataStorageLayer.js";

dotenv.config();

const app = express();
app.set("view engine", "pug");
app.enable("trust proxy");

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set("Content-Type", "text/json");
  next();
});

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

const server = app.listen(port, () => console.log(`Server running..`));

export default app;
