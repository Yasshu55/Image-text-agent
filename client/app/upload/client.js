'use client';

import { useState } from 'react';
import Conversation from '@/components/Conversation';

export default function Upload() {
  const [file, setFile] = useState(null);
  const[uploaded,isUploaded] = useState(true)
  const[message,isMessage] =  useState("");
  const[contextOfImage,isContextOfImage] = useState("");

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
               isUploaded(true);
               isMessage(data.message)
               isContextOfImage(data.contextOfImage)
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

            {uploaded && (
                <Conversation message={message} contextOfImage ={contextOfImage}/>
            )}

         </form>
       </div>
     )
}