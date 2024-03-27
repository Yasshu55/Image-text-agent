import express, { response } from 'express';
import path from 'path';
import cors from 'cors';
import sequelize from './config/sequelize.js'
import userRoutes from './routes/userRoutes.js'
import multerConfig from './utils/multerConfig.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.set("views",path.resolve("./views"));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.urlencoded({extended:false}));



sequelize.sync()
.then(() => console.log('Database models synchronized'))
.catch(err => console.error('Error synchronizing database models:', err));


// User routes 
app.use('/api', userRoutes);
// Applying multer configuration
app.use(multerConfig);


app.get("/",(req,res) =>{
    res.send("Welcomee to Pixel speak"); 
})

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))