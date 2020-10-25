const Umzug = require('umzug')
const db = require("../models");
const newCompany = db.newCompanies;
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const fs = require("fs");
const csv = require("fast-csv");

const update = (req, res) => {
  try {

    const umzug = new Umzug({
      migrations: {
        path: (__basedir + "/src/migrations/"),
        pattern: /\.js$/,
        params: [sequelize.getQueryInterface()]
      },
      storage: 'sequelize',
      storageOptions: { sequelize: sequelize }
    })

    let path = __basedir + "/src/uploads/q2_clientData.csv";

    umzug.up()
      .then(() => {
        console.log('All migrations performed successfully')

        fs.createReadStream(path)
          .pipe(csv.parse({ headers: ['name', undefined, 'website'], delimiter: ';' }))
          .on("error", (error) => {
            throw error.message;
          })
          .on("data", (row) => {
            newCompany.findOne({ where: { name: row.name } })
              .then((project) => {
                project.update({
                  website: row.website
                })
              })
              .catch(() => {
                console.log('Company not found')
              });
          })
          .on("end", () => {
            res.status(200).send({
              message: "File uploaded!",
            });
          });
      });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file.",
    });
  }
};

const getCompanies = (req, res) => {

  const Op = Sequelize.Op

  newCompany.findAll({ where: { name: { [Op.startsWith]: req.body.name } }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
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
  update,
  getCompanies
};