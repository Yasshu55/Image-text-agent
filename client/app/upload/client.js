'use client';

import { useState,useEffect } from 'react';
import Conversation from '@/components/Conversation';
import '@/styles/globals.css';
import { useRef } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Upload() {
  const router = useRouter()
  const saveHandlerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [message, setMessage] = useState("");
  const [contextOfImage, setContextOfImage] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    console.log(file);
  }, [file]);
  
  const uploadImage = (e) => {
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (file) {
      const imageData = new FormData();
      imageData.append("uploadImage", file);

      try {
        const response = await fetch('http://localhost:8000/api/upload', {
          method: 'POST',
          body: imageData
        });

        if (response.ok) {
          console.log("Successfully uploaded");
          const data = await response.json();
          if (data && data.message && data.contextOfImage) {
            setMessage(data.message);
            setContextOfImage(data.contextOfImage);
            setImageURL(data.imageURL);
            setUploaded(true);
          } else {
            console.error("Unexpected response format:", data);
          }
        } else {
          console.log("Unsuccessful");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      console.log("No file");
    }
  }

  return (
    <div class="flex flex-col h-screen">
      {/* <nav class="flex justify-between items-center py-1 px-6 bg-black-800 text-white">
        <ul class="flex">
          <a class="mr-4" href="/">PixelSpeak</a>
        </ul>
        <button class="inline-block border border-blue-500 rounded bg-blue-500 text-white hover:text-blue-800 px-4 py-2"
                onClick={() => router.push('/myprofile')}>
          My Profile
        </button>
      </nav> */}
  
      <div className="app-container flex-1 overflow-y-auto">
        <div className="upload-container">
          <div className="upload-box">
            <h2 className="upload-title">Upload Image</h2>
            <form className="upload-form" encType="multipart/form-data">
              <label htmlFor="file-input" className="file-input-label">
                <span className="file-input-text">Choose an image</span>
                <input
                  id="file-input"
                  type="file"
                  name="uploadImage"
                  onChange={uploadImage}
                  className="upload-input"
                />
              </label>
              {file && <p className='text-black mb-5'>{file.name}</p>}
              <button
                type="submit"
                onClick={submitHandler}
                className="upload-button mr-8"
                disabled={!file}
              >
                Submit
              </button>
              
            </form>
            <button class="inline-block border border-blue-500 rounded bg-blue-500 text-white hover:text-blue-800 px-4 py-2 mt-2 ml-24"
                onClick={() => router.push('/myprofile')}>
             My Profile
           </button>
            
            {uploaded && (
              <>
              <Image src={imageURL} alt="Uploaded" width={500} height={500} className="uploaded-image" />
                <button class="inline-block border border-blue-500 rounded bg-blue-500 text-white hover:text-blue-800 px-4 py-2 ml-24 mt-4" onClick={() => saveHandlerRef.current.saveHandler()}>Save Chat</button>
              </>
            )}
          </div>
        </div>
        {uploaded && (
          <div className="chat-container">
            <Conversation
              message={message}
              contextOfImage={contextOfImage}
              file={file}
              ref={saveHandlerRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}  