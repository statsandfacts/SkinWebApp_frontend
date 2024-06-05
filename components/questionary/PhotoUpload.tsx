'use client';
import React from 'react';
import ImageUpload from './ImageUpload';

const Photo = () => {
  return (
    <div>
      <div className='flex flex-col items-center bg-white w-full h-fit p-8 rounded-lg'>
        <div className='text-lg font-semibold mb-3 px-2'>
          Upload Images
          <span className='text-sm block font-normal text-gray-500'>
            This will be use for personalized treatment and recommendations.
          </span>
        </div>
        <ImageUpload />
        <div className='mt-3 w-full'>
          <span className='block font-normal text-gray-500 text-xs'>
            <span className='text-red-500'>*</span>
            Upload up to 3 images.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Photo;
