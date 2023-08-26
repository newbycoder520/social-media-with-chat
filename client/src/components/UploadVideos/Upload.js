import React, {useState} from 'react';
import Axios from "axios";


function Upload() {
  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryVideo, setCloudinaryVideo] = useState("")

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData ();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "epkv6ln0VIDUP");

    Axios.post(
     "https://api.cloudinary.com/v1_1/dk1eamqgk/video/upload",
     formData
   )
    .then((response) => {
      console.log(response);
      setCloudinaryVideo(response.data.secure_url);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return ( 
    <div className="App"> 
         <section className="left-side"> 
          <form>
              <h3> Upload Images to Cloudinary Cloud Storage</h3>
              <div>
                <input type="file" 
                onChange ={(event) => {setUploadFile(event.target.files[0]);}} 
              />
              </div>
             <button onClick = {handleUpload}> Upload File</button>
            </form> 
         </section>
         <section className="right-side">
          <h3>The resulting image will be displayed here</h3>
          {cloudinaryVideo && ( <video src={cloudinaryVideo} controls /> )}
        </section>
    </div>
  );
} 
export default Upload;