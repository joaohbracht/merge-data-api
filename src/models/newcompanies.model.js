module.exports = (sequelize, Sequelize) => {
  const newCompany = sequelize.define("companies", {
    name: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING
    }
  });

  return newCompany;
};