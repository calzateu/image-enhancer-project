import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageGallery from './components/ImageGallery';
import axios from 'axios';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImages, setEnhancedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simula una solicitud a la API para obtener las imágenes mejoradas.
    setTimeout(() => {
      setEnhancedImages([
        'https://via.placeholder.com/150?text=Enhanced+1',
        'https://via.placeholder.com/150?text=Enhanced+2',
        'https://via.placeholder.com/150?text=Enhanced+3',
        'https://via.placeholder.com/150?text=Enhanced+4',
      ]);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Improving Product Images</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {originalImage && (
        <ImageGallery originalImage={originalImage} enhancedImages={enhancedImages} loading={loading} />
      )}
    </div>
  );
};

export default App;
