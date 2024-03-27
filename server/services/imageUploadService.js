import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function uploadToImgBB(filePath, apiKey) {
    try {
        const formData = new FormData();
        formData.append('key', apiKey);
        formData.append('image', fs.createReadStream(filePath));
        console.log("Entered");
        console.log("File path : ", fs.createReadStream(filePath));

        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData.data.url;
        } else {
            throw new Error('Failed to upload image to ImgBB');
        }
    } catch (error) {
        console.log(error);
    }
}


export { uploadToImgBB };