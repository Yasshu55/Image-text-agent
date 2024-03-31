import {DataTypes} from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from '../config/sequelize.js';
import dotenv from 'dotenv';
import {User} from './User.js'

dotenv.config();

export const Conversation = sequelize.define('conversation', {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
    },
    conversation : {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull:false,
    },
    contextOfImage:{
        type: DataTypes.TEXT,
        allowNull: false,
    },  
    userId :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

// Conversation.belongsTo(User,{foreignKey:'userId'})