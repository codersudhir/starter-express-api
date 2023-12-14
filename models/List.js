const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const List = sequelize.define('List', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return List;
};
