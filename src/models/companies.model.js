module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("companies", {
    name: {
      type: Sequelize.STRING
    },
    addressZip: {
      type: Sequelize.STRING
    }
  });

  return Company;
};