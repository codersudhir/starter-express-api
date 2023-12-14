const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Assuming you have a method to validate the password
  User.prototype.validatePassword = function (password) {
    // Implement your password validation logic here
    // Compare the provided password with the stored hash
    return true; // Replace with your validation logic
  };

  return User;
};
