'use client';

import { useState } from 'react';
import Conversation from '@/components/Conversation';

export default function Upload() {
  const [file, setFile] = useState(null);
  const[uploaded,setUploaded] = useState(false)
  const[message,setMessage] =  useState("");
  const[contextOfImage,setContextOfImage] = useState("");

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
               const data = await response.json();
               if (data && data.message && data.contextOfImage) {
                setMessage(data.message);
                setContextOfImage(data.contextOfImage);
                setUploaded(true);
              } else {
                console.error("Unexpected response format:", data);
              }
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
            <form encType="multipart/form-data">
               <input type="file" name="uploadImage" onChange={uploadImage}/>
               <button type='submit' onClick={submitHandler}>Submit</button>
            </form>
            {uploaded && (
                <Conversation message={message} contextOfImage ={contextOfImage}/>
            )}
       </div>
     )
}