const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Users = sequelize.define('user', {
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    index:{
         type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    guid:{
         type: DataTypes.STRING,
        allowNull: false,
        
    },

    isActive:{
          type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    balance:{
         type: DataTypes.STRING,
        allowNull: false,

    },
    picture:{
         type: DataTypes.TEXT,
        allowNull: false,
    },
    age:{ 
        type: DataTypes.INTEGER,
        allowNull: false,
        
        },
    eyeColor:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
       type: DataTypes.JSON()
    },
    company:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
         type: DataTypes.TEXT,
        allowNull: false,
    },
    about:{
         type: DataTypes.TEXT,
        allowNull: false,
    },
    registered:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    latitude:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    longitude:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    tags:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    range:{
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    friends:{
        type: DataTypes.JSON()

    },
   
    greeting:{
         type: DataTypes.STRING,
        allowNull: false,
    },
    favoriteFruit:{
         type: DataTypes.STRING,
        allowNull: false,
    },
     {
        timestamps: false
    }
}
module.exports = Users ;