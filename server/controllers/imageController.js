// upload image and covert to URL 
import { uploadToImgBB } from '../services/imageUploadService.js';
import { contextGenerator } from '../services/contextGeneratorService.js';
import multerConfig from '../utils/multerConfig.js';

  const uploadImage = async (req, res) => {
    try {
      multerConfig(req, res, async function (err) {
        if (err) {
          console.log("Error in multerConfig:", err);
          return res.status(500).json({ error: 'Multer error occurred' });
      }
        const apiKey = process.env.IMGBB_API_URL;

        // Image to url generate
        console.log("Going to enter uploadToImgBB");
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