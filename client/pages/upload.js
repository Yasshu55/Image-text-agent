import React, { useState } from 'react'

function upload() {
    const [file,setFile] = useState(null);

 const uploadImage = (e) =>{
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile)
 }

 const submitHandler = async (e) =>{
    e.preventDefault();

    if(file){
        const imageData = new FormData();
        imageData.append("uploadImage",file);

        try {
            const response = await fetch('http://localhost:8000/api/upload',{
                method: 'POST',
                body: imageData
            })      
        if(response.ok){
            console.log("Successfully uploaded");
        } else {
            console.log("Unsucessfull");
        }
        } catch (error) {
            console.log("Errror: ", error);
        }
    } else {
        console.log("No file");
    }
 }

  return (
    <div>
        <form action="/upload" method="post" encType="multipart/form-data">
            <input type="file" name="uploadImage" onChange={uploadImage}/>
        <button type='submit' onClick={submitHandler}>Submit</button>
      </form>
    </div>
  )
}

export default upload