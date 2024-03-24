// upload image and covert to URL 
import { uploadToImgBB } from '../services/imageUploadService.js';
import { contextGenerator } from '../services/contextGeneratorService.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()} - ${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage }).single('uploadImage');

  const uploadImage = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // Multer error handling
            console.log("Multer error:", err);
            return res.status(500).json({ error: 'Multer error occurred' });
        } else if (err) {
            // Other error handling
            console.log("Other error:", err);
            return res.status(500).json({ error: err.message });
        }
        const apiKey = process.env.IMGBB_API_URL;

        // Image to url generate
        const imageURL = await uploadToImgBB(req.file.path,apiKey);
        console.log("Image URL - ",imageURL);

        const contextOfImage = await contextGenerator(imageURL)

        return res.json({imageURL: imageURL,contextOfImage: contextOfImage, message:"Hi! Welcome to PixelSpeak if you have any questions regarding the picture lets discuss! Below is the context of the image you provided"})
      });
    } catch (error) {
        console.log("Error at upload api: ",error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
  }

  export { uploadImage };