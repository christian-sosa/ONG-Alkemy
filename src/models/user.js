'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      User.belongsTo(models.Role, 
        {
          as: 'role',
          foreingKey: 'roleId'
        }
      );
=======
      User.belongsTo(models.Role, {as: 'role'});
>>>>>>> 95ff28c (removed comments, added deleted files, changed config/config file)
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
<<<<<<< HEAD
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
=======
    image: DataTypes.STRING,
    password: DataTypes.STRING,
>>>>>>> 95ff28c (removed comments, added deleted files, changed config/config file)
    roleId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
<<<<<<< HEAD
    timestamps: true,
    paranoid: true,
=======
>>>>>>> 95ff28c (removed comments, added deleted files, changed config/config file)
  });
  return User;
};