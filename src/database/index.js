const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');

const database = {};

const sequelize = new Sequelize(databaseConfig.development);

const modelsFolderPath = path.join(__dirname, '../models');

fs.readdirSync(modelsFolderPath)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(modelsFolderPath, file))(sequelize, Sequelize.DataTypes);
    database[model.name] = model;
  });

Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
