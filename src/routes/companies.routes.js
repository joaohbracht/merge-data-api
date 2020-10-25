const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csv.controller");

let routes = (app) => {
  app.use(express.json());

  router.post("/update", csvController.update);
  router.get("/companies", csvController.getCompanies);

  app.use("/api/csv", router);
};

module.exports = routes;