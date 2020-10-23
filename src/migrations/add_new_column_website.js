const Sequelize = require('sequelize')

module.exports = {
  up: async (query) => {
    await query.addColumn('companies', 'website', {
      type: Sequelize.DataTypes.STRING,
      after: "addressZip"
    })
  }
}