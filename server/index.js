import express, { response } from 'express';
import path from 'path';
import cors from 'cors';
import sequelize from './config/sequelize.js'
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import multerConfig from './utils/multerConfig.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

app.set("views",path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

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