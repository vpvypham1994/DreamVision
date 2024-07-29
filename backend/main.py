from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import aiofiles
import requests
import os
import json
from concurrent.futures import ThreadPoolExecutor
from openai import AzureOpenAI
from gradio_client import Client, file
import subprocess

RESTRICTED_KEYWORDS = ["nudity", "gun violence", "explicit", "terrorism"]

# Set up the application and directory paths
app = FastAPI()
UPLOAD_DIRECTORY = "./uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)
app.mount("/static", StaticFiles(directory="uploads"), name="static")

# Model class definition
class Prompt(BaseModel):
    message: str

# Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"]   # Allows all headers
)

# OpenAI client configuration
client = AzureOpenAI(
    azure_endpoint="g",
    api_key="",
    api_version="2024-02-15-preview"
)

# Executor for asynchronous tasks
executor = ThreadPoolExecutor()

# Functions for file management
def delete_contents_of_output(directory_path='output'):
    if os.path.exists(directory_path):
        for item_name in os.listdir(directory_path):
            item_path = os.path.join(directory_path, item_name)
            if os.path.isfile(item_path):
                os.remove(item_path)
            else:
                shutil.rmtree(item_path)
        print("All files and folders inside the 'output' directory have been deleted.")

def download_and_save_image(image_url, file_path):
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        with open(file_path, 'wb') as file:
            file.write(response.content)
        return True
    except requests.RequestException as e:
        print(f"Error downloading the image: {e}")
        return False
    except IOError as e:
        print(f"Error saving the image: {e}")
        return False

# Functions for data processing and AI
def enhance_prompt(original_prompt):
    message_text = [
        {"role": "system", "content": f"Expand this brief object description into a detailed, vivid prompt for an image generator DALL-E3.Make sure the object is on flat ground. Make sure the image is suitable for a image-to-3D model generator: {original_prompt}"}
    ]
    try:
        completion = client.chat.completions.create(
            model="textgeneration",  # Update model name as needed
            messages=message_text,
            temperature=0.7,
            max_tokens=100,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Error in generating prompt: {e}")
        return original_prompt

def generate_3D_model(image='image.png'):
    print("Generate 3D model")
    command = ["python3", "Generator/run.py", image, "--output-dir", "output/"]
    try:
        subprocess.run(command, check=True)
        # Assuming the output file is always named 'model.glb' in the output directory
        model_path = os.path.join("output/0", "mesh.glb")
        if os.path.exists(model_path):
            return model_path
        else:
            raise FileNotFoundError(f"Expected output file not found: {model_path}")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while generating the 3D model: {e}")
        raise HTTPException(status_code=500, detail="3D model generation failed.")


def filter_prompt(prompt: str):
    """ Check if the prompt contains any restricted content. """
    if any(keyword in prompt.lower() for keyword in RESTRICTED_KEYWORDS):
        raise HTTPException(status_code=400, detail="Input contains restricted content.")

# FastAPI endpoints
@app.post("/image-generate-model/")
async def create_upload_file(file: UploadFile = File(...)):
    local_file_path = 'image.png'
    async with aiofiles.open(local_file_path, 'wb') as out_file:
        while content := await file.read(1024):
            await out_file.write(content)
    model_path = generate_3D_model()
    delete_contents_of_output()
    print(model_path)
    return FileResponse(model_path, media_type='application/octet-stream', filename="mesh.glb")


# Modify existing endpoint to include the filter_prompt call
@app.post("/text-generate-image/")
async def process_image(prompt: Prompt):
    # First, filter the prompt for restricted content
    # filter_prompt(prompt.message)
    print(prompt)
    image_client = Client("ByteDance/SDXL-Lightning",download_files="C:/Users/Kurst/Downloads/DreamVision/backend/uploads/")

    filepath = image_client.predict(
            prompt=prompt.message,
            ckpt="4-Step",
            api_name="/generate_image"
    )
    print(filepath)
    
    return FileResponse(filepath, media_type='image/png', filename="image.png")

# Ensure all other endpoints where user input is accepted also call filter_prompt()
@app.post("/image-generate-model-preloaded/")
async def process_image_preloaded(prompt: Prompt):
    # Filter the prompt
    filter_prompt(prompt.message)

    image_client = Client("ByteDance/SDXL-Lightning",download_files="C:/Users/Kurst/Downloads/DreamVision/backend/uploads/")
    filepath = image_client.predict(
            prompt=prompt.message,
            ckpt="8-Step",
            api_name="/generate_image"
    )
    print(filepath)
    model_path = generate_3D_model(filepath)
    delete_contents_of_output()
    return FileResponse(model_path, media_type='application/octet-stream', filename="model.glb")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    #model_path = generate_3D_model("image.png")
    #print(f"3D model generated successfully: {model_path}")
