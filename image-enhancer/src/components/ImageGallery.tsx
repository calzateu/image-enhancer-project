import React, { FC } from 'react';

interface ImageGalleryProps {
  originalImage: string;
  enhancedImages: string[];
  loading: boolean;
}

const ImageGallery: FC<ImageGalleryProps> = ({ originalImage, enhancedImages, loading }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Original Image</h2>
      <div className="w-48 h-48 mb-8">
        <img src={originalImage} alt="Original" className="w-full h-full object-cover rounded-lg" />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Generating enhanced images...</div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Enhanced Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {enhancedImages.map((img, index) => (
              <img key={index} src={img} alt={`Enhanced ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
