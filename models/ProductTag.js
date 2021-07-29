const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      DataTypes: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      DataTypes: DataTypes.INTEGER,
      references: {
      modelName: 'Product',
      key: 'id',
      unique: false
      },
      tag_id: {
        DataTypes: DataTypes.INTEGER,
        refences: {
        modelName: 'Tag',
        key: 'id',
        unique: false
        }
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
