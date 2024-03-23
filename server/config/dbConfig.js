const {Pool} = require('pg')
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: `${process.env.DB_PASSWORD}`, 
    port: 5432
})

module.exports = pool;