var DataTypes = require("sequelize/lib/data-types");

module.exports = (sequelize, Sequelize) => {
  const Detail = sequelize.define("detail", {
    id: {
      type: Sequelize.UUID,
      // allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    // detail_id: {//employee
    //   type: Sequelize.STRING,
    //   allowNull: true,
    // },
    user_id: {//company
      type: Sequelize.UUID,
      // allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      // allowNull: false
    },
    // email: {
    //   type: Sequelize.STRING,
      //allowNull: false,
    //   // unique: true,
    // },
    website: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      // allowNull: false
    },
    longitude:{
      type: DataTypes.DOUBLE,
      // allowNull: false
    },
    address:{
      type: Sequelize.STRING,
      // allowNull: false
    },
    state:{
      type: Sequelize.STRING,
      // allowNull: false
    },
    city:{
      type: Sequelize.STRING,
      // allowNull: false
    },
    type:{
      type: Sequelize.STRING,
      // allowNull:false
    },
    //demographic data
    opening_time:{
      type: Sequelize.TIME,

    },    
    closing_time:{
      type: Sequelize.TIME,
    },
    total_beds:{
      type: Sequelize.INTEGER,
 
    },
    available_beds:{
      type: Sequelize.INTEGER,
  
    },
    specifications:{
      type: Sequelize.STRING,
     
    },
    functionalities: {
      type: Sequelize.STRING,

    }

  });

  return Detail;
};
