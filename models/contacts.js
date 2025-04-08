const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contacts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    lonitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'contacts',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
