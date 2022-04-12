"use strict";
import Datastorage from "./dataStorageLayer.js";

const storage = new Datastorage();
const npsdata = {
  id: 120,
  date: "2018-06-04",
  score: 9,
  feedback: "Best organization ",
};
storage.insert(npsdata).then(console.log).catch(console.log);
storage.getAll().then(console.log).catch(console.log);
