# DreamVision

A web application to generate 3D model from text input fuel by Google Gemini A.I .

## Installation

To start the react frontend do as follow.

```bash
#start at root folder
npm install
npm run dev
```

To start the FASTAPI backend end do as follow
```bash
#start at root folder
cd backend
pip install -r requirements.txt
```
Then add your Azure OpenAI API key and enpoind url
```python
client = AzureOpenAI(
    azure_endpoint="YOUR_ENDPOINT_URL", #replace with your endpoint
    api_key="YOUR_API_KEY", #replace with your API key
    api_version="2024-02-15-preview"
)
```
Finally start the backend server 
```bash
uvicorn main:app --reload
```
Get your API key at https://azure.microsoft.com/en-us/solutions/ai if you do not have one 


## Testing Procedure 

**Testing Text-to-3D**
1. Open the web application link: https://dreamvision-olive.vercel.app
2. Click on the Text-to-3D card
3. Input a brief description of an object you want to generate in the box below "Input A Description". Re generate if result is unsatisfactory.
Example : "A white wolf standing"
4. Click the Generate Button
5. Wait around 2 minutes for the model to do it magic
6. After 2 minutes, a 3D model should appear in the big black box at the bottom
7. Click download button to save the generated model in .glb format

 **Testing Image-to-3D**
1. Open the web application link: https://dreamvision-olive.vercel.app
2. Click the Image-to-3D tab on the sidebar on the left
3. Select the Image of the donut 
4. Click the Generate button
5. After 2 minutes there should be a 3D model of a donut appear in the black box
6. (Optional): Upload your own image and click the generate button, make sure the image is a single object with single color background. A 3D model of your image should appear in 2 minutes.

## Hosting option

Recommend to host the react app on vercelc.com and backend on render.com

## License

[MIT](https://choosealicense.com/licenses/mit/)
