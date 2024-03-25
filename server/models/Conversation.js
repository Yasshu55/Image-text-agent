import {DataTypes} from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from '../config/sequelize.js';
import dotenv from 'dotenv';

dotenv.config();

export const Conversation = sequelize.define('conversation', {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
    },
    conversation : {
        type: Sequelize.json,
        allowNull:false,
    },
    contextOfImage:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    userId :{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})