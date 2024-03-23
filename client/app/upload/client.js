'use client';

import { useState } from 'react';
import Conversation from '@/components/Conversation';
import '@/styles/globals.css';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [message, setMessage] = useState("");
  const [contextOfImage, setContextOfImage] = useState("");
  const [imageURL, setImageURL] = useState("");

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
    <div className="app-container">
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
              className="upload-button"
              disabled={!file}
            >
              Submit
            </button>
          </form>
          {uploaded && (
            <img src={imageURL} alt="Uploaded" className="uploaded-image" />
          )}
        </div>
      </div>
      {uploaded && (
        <div className="chat-container">
          <Conversation message={message} contextOfImage={contextOfImage} />
        </div>
      )}
    </div>
  );
}