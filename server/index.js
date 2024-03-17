import express from 'express';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();




const app = express();
const PORT = process.env.PORT || 8000;

app.set("views",path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()} - ${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

app.get("/",(req,res) =>{
    res.send("Upload successful"); 
})

app.post('/api/upload', upload.single('uploadImage'), async (req,res) =>{
    try {
        const apiKey = process.env.IMGBB_API_URL;
        const imageURL = await uploadToImgBB(req.file.path,apiKey);

        console.log(imageURL);
    
        res.status(200).json({imageURL});
    } catch (error) {
        console.log("Error at upload api: ",error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
})

async function uploadToImgBB(filePath,apiKey){
    const formData = new FormData;
    formData.append('key',apiKey)
    formData.append('image',fs.createReadStream(filePath))

    const response = await fetch('https://api.imgbb.com/1/upload',{
        method:'POST',
        body: formData
    })

    if(response.ok){
        const responseData = await response.json();
        return responseData.data.url;
    }else {
        throw new Error('Failed to upload image to ImgBB');
    }

}

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))