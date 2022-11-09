'use strict';
module.exports = (sequelize, DataTypes) => {
  const periodoalertas = sequelize.define('periodoalertas', {
    firstName: DataTypes.STRING
  }, {});
  periodoalertas.associate = function(models) {
    // associations can be defined here
  };
  return periodoalertas;
};