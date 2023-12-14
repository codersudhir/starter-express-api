const { Sequelize } = require("sequelize");
const UserModel = require("./User");
const ListModel = require("./List");
const TaskModel = require("./Task");

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'pg-1aa921ec-nandanesudhir1-691a.a.aivencloud.com',
  port: 14390, // Replace with your Aiven port
  username: 'avnadmin',
  password: 'AVNS_e0VY3LUOYKnRltph3va',
  database: 'defaultdb',
  ssl: true, // Enable SSL for secure connection
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Disables SSL certificate validation, not recommended for production
    },
  },
  logging: false,
});;

const User = UserModel(sequelize);
const List = ListModel(sequelize);
const Task = TaskModel(sequelize);

// Associations
User.hasMany(List);
List.belongsTo(User);

List.hasMany(Task);
Task.belongsTo(List);

module.exports = { sequelize, User, List, Task };
