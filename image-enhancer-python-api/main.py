from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
from PIL import Image
import base64
from io import BytesIO

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Image enhancement simulation function, returning images in base64 format
def enhance_image(file: UploadFile) -> List[str]:
    # Open the uploaded image using Pillow
    image = Image.open(file.file)

    # Create simulated "enhanced" variations of the original image
    enhanced_images = []
    for i in range(1, 5):
        # Create a copy of the original image
        img_copy = image.copy()

        # Simulated image processing (e.g., resizing)
        img_copy = img_copy.resize((150, 150))  # Resize as an example

        # Convert image to base64 format
        buffered = BytesIO()
        img_copy.save(buffered, format="PNG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # Add the base64 image string to the list
        enhanced_images.append(img_base64)

    return enhanced_images

@app.post("/enhance-image")
async def enhance_image_endpoint(file: UploadFile = File(...)):
    # Ensure the uploaded file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    # Call the image enhancement function
    enhanced_images = enhance_image(file)

    # Return a JSON response with the enhanced images in base64 format
    return JSONResponse(content={"enhanced_images": enhanced_images})
