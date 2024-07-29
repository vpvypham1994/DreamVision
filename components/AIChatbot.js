"use client";
import React, { useState, Suspense, useRef  } from "react";
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
      <directionalLight position={[-20, 5, 2]} intensity={8} />
      <directionalLight position={[20, 5, 2]} intensity={4} />
      <directionalLight position={[0, 0, -1]} intensity={8} />
      <directionalLight position={[0, 1, 0]} intensity={8} />
      <directionalLight position={[0, -1, 0]} intensity={8} />

      <Suspense fallback={null}>
      <primitive object={gltf.scene} position={[0, 0.1, 0]} scale={1} />
      </Suspense>
      <OrbitControls />
      <gridHelper position={[0, -.84, 0]} args={[10, 10]} />

    </Canvas>
  );
}
export default function AIChatbot() {
  const [imageUrl, setImageUrl] = useState(
    "https://ehs.stanford.edu/wp-content/uploads/missing-image.png"
  ); // Replace this URL with your desired default image URL
  const [modelUrl, setModelUrl] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const imageRef = useRef(null); // Create a reference to the image element

  const handleTextChange = (event) => {
    setPromptText(event.target.value);
  };

  const generateImage = async () => {
    setIsLoadingImage(true);
    const promptData = { message: promptText };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/text-generate-image/",
        promptData,
        { responseType: "blob" }
      );

      // Create a URL for the blob
      const imageBlobUrl = URL.createObjectURL(response.data);
      setImageUrl(imageBlobUrl); // Set the URL to the state
    } catch (error) {
      console.error("Error generating image", error);
    }
    setIsLoadingImage(false);
  };

  const generate3DModel = async () => {
    setIsLoading(true); // Start loading

    const imageElement = imageRef.current;
    const response = await fetch(imageElement.src);
    const blob = await response.blob();
    const file = new File([blob], "generated_image.png", { type: blob.type });

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
      <div className="image-to-3D-container">
        <div className="generation_input">
          <p className="title">Prompt</p>

          <div className="header_bottom">
            <div className="include_area">
              <textarea
                id="fn__include_textarea"
                value={promptText}
                onChange={handleTextChange}
                rows={1}
                

              />
              <textarea
                className="fn__hidden_textarea"
                rows={1}
                tabIndex={-1}
              />
            </div>

            <div className="generate_section">
              <Link
                id="generate_it"
                href="#"
                className="button-24"
                onClick={generateImage}
              >
                <span>{isLoadingImage ? "Generating..." : "Generate Image"}</span>
              </Link>

              {/* !Generation Header */}
              <p className="title2">Image</p>

              <div className="generate_image_container">
                <img ref={imageRef} src={imageUrl} alt="Generated" />
              </div>

              <Link
                id="generate_it"
                href="#"
                className={`button-24 ${imageUrl == "https://ehs.stanford.edu/wp-content/uploads/missing-image.png" ? "disabled" : ""}`}
                onClick={generate3DModel}
                style={{ pointerEvents: imageUrl == "https://ehs.stanford.edu/wp-content/uploads/missing-image.png" ? "none" : "auto",
                         backgroundColor: imageUrl == "https://ehs.stanford.edu/wp-content/uploads/missing-image.png" ? "#2b2830" : "#7c5fe3"
                 }}
              >
                <span>{isLoading ? "Generating..." : "Generate Model"}</span>
              </Link>

              <button
                className="button-24"
                onClick={downloadModel}
                disabled={!imageUrl}
                style={{ pointerEvents: imageUrl == "https://ehs.stanford.edu/wp-content/uploads/missing-image.png" ? "none" : "auto",
                backgroundColor: imageUrl == "https://ehs.stanford.edu/wp-content/uploads/missing-image.png" ? "#2b2830" : "#7c5fe3"
        }}
              >
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
