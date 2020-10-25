const fs = require("fs");
const csv = require("fast-csv");
const { format } = require('@fast-csv/format');

module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("companies", {
    name: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    }
  });

  let companies = [];
  let path = __basedir + "/src/uploads/q1_catalog.csv";

  fs.createReadStream(path)
    .pipe(csv.parse({ headers: ['name', 'zip'], renameHeaders: true, delimiter: ';' })
      .transform(data => ({ name: data.name.toUpperCase(), zip: data.zip })))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", (row) => {
      companies.push(row);
    })
    .on("end", () => {
      Company.bulkCreate(companies)
    });

  return Company;
};