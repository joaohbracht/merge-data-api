const express = require("express");
const app = express();

global.__basedir = __dirname + "/..";

const db = require("./models");
const initRoutes = require("./routes/companies.routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

db.companies.sync();
/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost: ${port}`);
});