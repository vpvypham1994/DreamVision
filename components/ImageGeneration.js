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
  <Canvas colorManagement style={{ background: "grey" }} key={modelUrl}>
  <ambientLight intensity={2} />
  <directionalLight position={[-20, 5, 2]} intensity={8}  />
  <directionalLight position={[20, 5, 2]} intensity={4} />
  <directionalLight position={[0, 0, -1]} intensity={8} />
  <directionalLight position={[0, 1, 0]} intensity={8} />
  <directionalLight position={[0, -1, 0]} intensity={8} />

  <Suspense fallback={null}>
    <primitive object={gltf.scene} scale={1} />
  </Suspense>
  <OrbitControls />
</Canvas>
  );
}

export default function ImageGeneration() {
  const [count, setCount] = useState(4);
  const [leftMenu, setLeftMenu] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const handleIsDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const leftMenuHandler = () => {
    setLeftMenu(!leftMenu);
    document
      .querySelector(".techwave_fn_wrapper")
      .classList.toggle("fn__has_sidebar");
  };

  const handleIncrement = () => {
    if (count < 20) {
      setCount(count + 1);
    }
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleInput = (event) => {
    const val = event.target.value;
    setSliderValue(val);
  };

  const [sliderValue, setSliderValue] = useState(7);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [promptText, setPromptText] = useState("");


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file ? file.name : "No file chosen");

    // File reader for image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Function to trigger file input
  const triggerFileInput = async (imageSrc) => {
    try {
      setIsLoading(true); // Start loading

      const response = await axios.post(
        "https://dreamvison.onrender.com/image-generate-model-preloaded/",
        { message: imageSrc }, // Pass the image source URL to the backend
        { responseType: "blob" } // Important for handling binary data
      );
      // Create a URL for the blob
      const modelBlobUrl = URL.createObjectURL(response.data);
      setModelUrl(modelBlobUrl); // Set the URL to the state
      setIsLoading(false); // Stop loading once the data is fetched

    } catch (error) {
      console.error("Error uploading image", error);
      setIsLoading(false); // Stop loading once the data is fetched

    }
  };


  const handleUpload = async () => {
    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("https://dreamvison.onrender.com/image-generate-model/", formData,{responseType: "blob", // Important for handling binary data
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

  const downloadModel = () => {
    const link = document.createElement("a");
    link.href = modelUrl;
    link.download = "3DModel.glb"; // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="techwave_fn_image_generation_page">
        <div className="generation__page">
          {/* Generation Header */}
          <div className="generation_header">
            <div className="header_top">
              <h1 className="title">Upload An Image</h1>
            
            
            </div>

            <div className="header_bottom">
            {imagePreviewUrl && (
                <div className="image-preview-container">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="image-preview"
                  />
                </div>
              )}
              <div className="file-upload-container">
                <input
                  id="file-upload-input"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
                <span>{fileName}</span>
              </div>
              <span>{fileName}</span>

              <div class="container">
                  {/* Preloaded Image that triggers file input */}
                  <div className="image-container">
                    <img
                      src="https://i.imgur.com/hrcaWF5.png" // Adjust this path based on your project setup
                      alt="Click to upload"
                      onClick={() =>triggerFileInput('https://i.imgur.com/hrcaWF5.png')}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>  
                  <div className="image-container">
                    <img
                      src="https://i.imgur.com/yJxca2L.png" // Adjust this path based on your project setup
                      alt="Click to upload"
                      onClick={() =>triggerFileInput('https://i.imgur.com/yJxca2L.png')}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  {/* Preloaded Image that triggers file input */}
                </div>

          
              <div className="generate_section">
                <Link
                  id="generate_it"
                  href="#"
                  className="techwave_fn_button"
                  onClick={handleUpload}
                >
                  <span>{isLoading ? "Generating..." : "Generate"}</span>
                </Link>
           
                <button className="techwave_fn_button"  onClick={downloadModel}>Download</button>
              </div>

              

    
            </div>
          </div>

          {/* !Generation Header */}
          <div className="generation_history">
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>

          <div className="generation_history">

          <div className="viewer_object">
          {isLoading ? (
                <div id="loader"></div>
              ) : (
                modelUrl && (
                    <ModelViewer modelUrl={modelUrl} />
                )
              )}
          </div>
        </div>
        </div>

        
        
      </div>
    </>
  );
}
