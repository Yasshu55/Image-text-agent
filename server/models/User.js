import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import dotenv from 'dotenv';

dotenv.config();

export const User = sequelize.define('User',{
    id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
    },

    userName : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    },
})

 