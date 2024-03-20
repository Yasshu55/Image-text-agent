import express, { response } from 'express';
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

  //Upload the image
  async function uploadToImgBB(filePath,apiKey){
    try {
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
    } catch (error) {
        console.log(error);
    }

}
// imageURL to context generator
async function contextGenerator(imageURL){
    try {
        const response = await fetch('https://marmot-first-centrally.ngrok-free.app/generate', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              "image_urls": [imageURL]
            })
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("Generated Texts:", data.generated_texts); 

            return data.generated_texts;
          } else {
            throw new Error('Failed to generate context from image');
          }
    } catch (error) {
        console.log(error);
    }
}

// context and to and fro converasation
async function conversation(contextOfImage){
   try {
    query({"inputs": {
        "question": "Elaborate and give me more context on this",
        "context": `${contextOfImage}`
    }}).then((response) => {
    console.log("Answer to ur question : ",JSON.stringify(response));
    });
   } catch (error) {
    console.error("Error generating text:", error);
    // Retry after 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    await conversation(contextOfImage); // Retry the request
   }
}
// Converational BERT API function 
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/google-bert/bert-large-uncased-whole-word-masking-finetuned-squad",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}



app.get("/",(req,res) =>{
    res.send("Welcomee to Pixel speak"); 
})

app.post('/api/upload', upload.single('uploadImage'), async (req,res) =>{
    try {
        const apiKey = process.env.IMGBB_API_URL;

        // Image to url generate
        const imageURL = await uploadToImgBB(req.file.path,apiKey);
        console.log("Image URL - ",imageURL);

        const contextOfImage = await contextGenerator(imageURL)

        return res.json({contextOfImage: contextOfImage, message:"Hi! Welcome to PixelSpeak if you have any questions regarding the picture lets discuss! Below is the context of the image ou provided"})

    } catch (error) {
        console.log("Error at upload api: ",error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
})

app.post("/api/conversation", async (req,res) =>{
    try {
        const {question,contextOfImage} = req.body;
        console.log("This is ques : ",question," and this is the context : ",contextOfImage);
        const answer = await query({"inputs": {
            "question": question,
            "context": contextOfImage
        }})
        console.log("This is answer : ", answer);
        return res.json({answer})

    } catch (error) {
        console.log("Error at convo api : ", error );
        res.status(500).json({error : "Failed to upload image"})
    }
})



app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))