/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei"; // Import OrbitControls

function ModelViewer({ modelUrl }) {
  const gltf = useLoader(GLTFLoader, modelUrl);

  return (
    <Canvas colorManagement key={modelUrl}>
      <ambientLight intensity={2} />
      <directionalLight position={[-20, 5, 2]} intensity={2} />
      <directionalLight position={[20, 5, 2]} intensity={2} />
      <directionalLight position={[0, 0, -1]} intensity={2} />
      <directionalLight position={[0, 1, 0]} intensity={2} />
      <directionalLight position={[0, -1, 0]} intensity={2} />

      <Suspense fallback={null}>
      <primitive object={gltf.scene} position={[0, 0.1, 0]} scale={1} />
      </Suspense>
      <OrbitControls />
      <gridHelper position={[0, -.84, 0]} args={[10, 10]} />

    </Canvas>
  );
}

function ImageGeneration() {
  const [fileName, setFileName] = useState("No file chosen");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);

  const triggerFileInput = () => {
    // Simulate a click on the actual file input element
    document.getElementById("upload-input").click();
  };

  const triggerExampleFileInput = (imageSrc) => {
      // Set image preview URL directly without needing file input
      setImagePreviewUrl(imageSrc);

      // Optionally, if needed to use imageSrc as file for some functionality
      setFileName(imageSrc.split('/').pop()); // Extract file name from URL

      fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], imageSrc.split('/').pop(), { type: blob.type });
        setFile(file);
      })
      .catch(error => console.error("Error fetching image as Blob:", error));


  };

  const downloadModel = () => {
    const link = document.createElement("a");
    link.href = modelUrl;
    link.download = "3DModel.glb"; // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    console.log("hit")
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);

      // File reader for image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/image-generate-model/",
        formData,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a URL for the blob
      const modelBlobUrl = URL.createObjectURL(response.data);
      setModelUrl(modelBlobUrl); // Set the URL to the state
      setIsLoading(false); // Stop loading once the data is fetched
    } catch (error) {
      console.error("Error uploading file", error);
      setIsLoading(false); // Stop loading once the data is fetched
    }
  };

  return (
    <>
      <div className="image-to-3D-container">
          <div className="generation_input">
            <div className="header_bottom">
              <p className="title">Image</p>

              <div className="file-upload-container" onClick={triggerFileInput}>             <div className="upload-text">Upload Image</div> 

                {imagePreviewUrl && (
                  <div className="image-preview-container">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="image-preview"
                    />
                  </div>
                )}
                <input
                  className="file-upload-input"
                  id="upload-input"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
              </div>
              <p className="title2">Try an Example</p>

              <div className="exmaple-images"> 
                <div className="small-box">  <div className="example-text">Try This</div> 
   
                <img
                      src="https://i.imgur.com/yJxca2L.png" // Adjust this path based on your project setup
                      alt="Click to upload"
                      onClick={() =>triggerExampleFileInput('https://i.imgur.com/yJxca2L.png')}
                      style={{ cursor: 'pointer' }}
                    /></div>
                <div className="small-box"> <div className="example-text">Try This</div> 
   
   <img
         src="https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/44946155c8a6c9fa092e164662378a73519a6d85/bubble_mart_blue.png" // Adjust this path based on your project setup
         alt="Click to upload"
         onClick={() =>triggerExampleFileInput('https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/44946155c8a6c9fa092e164662378a73519a6d85/bubble_mart_blue.png')}
         style={{ cursor: 'pointer' }}
       /></div>
                <div className="small-box"> <div className="example-text">Try This</div> 
   
   <img
         src="https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/a23e1626f8bb43c01b934940893b522fc1132092/cute_horse.jpg" // Adjust this path based on your project setup
         alt="Click to upload"
         onClick={() =>triggerExampleFileInput('https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/a23e1626f8bb43c01b934940893b522fc1132092/cute_horse.jpg')}
         style={{ cursor: 'pointer' }}
       /></div>
                <div className="small-box"> <div className="example-text">Try This</div> 
   
   <img
         src="https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/3dad8a548ef6bd98edb0fc3d549f9b8438e58e2a/cute_tiger.jpg" // Adjust this path based on your project setup
         alt="Click to upload"
         onClick={() =>triggerExampleFileInput('https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/3dad8a548ef6bd98edb0fc3d549f9b8438e58e2a/cute_tiger.jpg')}
         style={{ cursor: 'pointer' }}
       /></div>
                <div className="small-box"> <div className="example-text">Try This</div> 
   
   <img
         src="https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/ee29c032e6ffe68c25ab8190a1258d5a6b06e98f/genshin_building.png" // Adjust this path based on your project setup
         alt="Click to upload"
         onClick={() =>triggerExampleFileInput('https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/ee29c032e6ffe68c25ab8190a1258d5a6b06e98f/genshin_building.png')}
         style={{ cursor: 'pointer' }}
       /></div>
                <div className="small-box"> <div className="example-text">Try This</div> 
   
   <img
         src="https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/5414328e1487820155506adaa95d8f8c82e1a96b/fox.jpg" // Adjust this path based on your project setup
         alt="Click to upload"
         onClick={() =>triggerExampleFileInput('https://tencentarc-instantmesh.hf.space/file=/tmp/gradio/5414328e1487820155506adaa95d8f8c82e1a96b/fox.jpg')}
         style={{ cursor: 'pointer' }}
       /></div>
              </div>

              <div className="generate_section">
                <Link
                  id="generate_it"
                  href="#"
                  className="button-24"
                  onClick={handleUpload}
                >
                  <span>{isLoading ? "Generating..." : "Generate"}</span>
                </Link>
                <button className="button-24" onClick={downloadModel}>
                  Download
                </button>
              </div>

            </div>
          </div>
          
          <div className="generation_output">
                <div className="viewer_object">
                  {isLoading ? (
                      <div className="loader">
                      <div className="loader-wheel"></div>
                      <div className="loader-text"></div>
                    </div>
                  ) : (
                    modelUrl && <ModelViewer modelUrl={modelUrl} />
                  )}
                </div>
          </div>
      </div>
    </>
  );
}

export default ImageGeneration;
