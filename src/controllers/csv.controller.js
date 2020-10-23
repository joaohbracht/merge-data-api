const Umzug = require('umzug')
const db = require("../models");
const Company = db.companies;
const sequelize = db.sequelize;

const fs = require("fs");
const csv = require("fast-csv");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let companies = [];
    let path = __basedir + "/src/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true, delimiter: ';' }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        companies.push(row);
      })
      .on("end", () => {
        Company.bulkCreate(companies)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const update = (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let companies = [];
    let path = __basedir + "/src/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true, delimiter: ';' }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        companies.push(row);
      })
      .on("end", () => {
        const umzug = new Umzug({
          migrations: {
            path: (__basedir + "/src/migrations/"),
            pattern: /\.js$/,
            params: [
              sequelize.getQueryInterface()
            ]
          },
          storage: 'sequelize',
          storageOptions: {
            sequelize: sequelize
          }
        })

          ; (async () => {
            await umzug.up()
            console.log('All migrations performed successfully')
          })()
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getCompanies = (req, res) => {
  Company.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies.",
      });
    });
};

module.exports = {
  upload,
  update,
  getCompanies
};