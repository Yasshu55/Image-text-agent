import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export const User = sequelize.define('user',{
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


User.prototype.comparePassword = async function(enteredPassword){
    try {
        const isMatch = await bcrypt.compare(enteredPassword,this.password)
        return isMatch;        
    } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords');
    }
}