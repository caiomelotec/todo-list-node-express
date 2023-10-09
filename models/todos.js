const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Todo = sequelize.define("todo", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: Sequelize.STRING,
  date: Sequelize.STRING,
});

module.exports = Todo;
