const {Sequelize, DataTypes } = require('sequelize')


var sequelize = new Sequelize('db', 'root', 'asdf123456', {
    host: 'localhost',
    dialect: 'mysql',
    
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },timestamps: true,


  });

   const testConnection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  testConnection()


  module.exports= sequelize


