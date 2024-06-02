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
    client = Client(src="TencentARC/InstantMesh",output_dir="")
    result = client.predict(
            input_image=file(image),
            do_remove_background=True,
            api_name="/preprocess"
    )
    result = client.predict(
		input_image=file(result),
		sample_steps=75,
		sample_seed=42,
		api_name="/generate_mvs"
    )
    result = client.predict(
		api_name="/make3d"
    )
    return result[1]

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
    return FileResponse(model_path, media_type='application/octet-stream', filename="model.glb")


# Modify existing endpoint to include the filter_prompt call
@app.post("/text-generate-image/")
async def process_image(prompt: Prompt):
    # First, filter the prompt for restricted content
    # filter_prompt(prompt.message)
    print(prompt)

    # Existing processing logic
    # result = client.images.generate(
    #     model="DallEImageGenerator",
    #     prompt=prompt,
    #     n=1
    # )
    # image_url = json.loads(result.model_dump_json())['data'][0]['url']
    filepath = "image.png"
    #download_and_save_image(image_url, filepath)
    
    # Return the image file instead of a 3D model
    return FileResponse(filepath, media_type='image/png', filename="image.png")

# Ensure all other endpoints where user input is accepted also call filter_prompt()
@app.post("/image-generate-model-preloaded/")
async def process_image_preloaded(prompt: Prompt):
    # Filter the prompt
    filter_prompt(prompt.message)

    # Existing processing logic
    image_url = prompt.message
    if 'hrcaWF5.png' in image_url:
        filepath = "hrcaWF5.png"
    elif 'yJxca2L.png' in image_url:
        filepath = 'yJxca2L.png'
    else:
        filepath = 'image.png'
    model_path = generate_3D_model(filepath)
    delete_contents_of_output()
    return FileResponse(model_path, media_type='application/octet-stream', filename="model.glb")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
