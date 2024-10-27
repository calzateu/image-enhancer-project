import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageGallery from './components/ImageGallery';
import axios from 'axios';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImages, setEnhancedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle image upload and send request to backend
  const handleImageUpload = async (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Create a FormData object to send the file to the backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send image to the Python endpoint
      const response = await axios.post("http://localhost:8000/enhance-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the state with the enhanced images in base64 format
      const base64Images = response.data.enhanced_images.map((img: string) => `data:image/png;base64,${img}`);
      setEnhancedImages(base64Images);
    } catch (error) {
      console.error("Error enhancing the image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product Image Enhancement</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {originalImage && (
        <ImageGallery originalImage={originalImage} enhancedImages={enhancedImages} loading={loading} />
      )}
    </div>
  );
};

export default App;
