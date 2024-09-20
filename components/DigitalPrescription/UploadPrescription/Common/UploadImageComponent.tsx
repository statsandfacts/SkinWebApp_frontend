"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addImageToUploadImages,
  removeImageFromUploadImages,
  setUploadedImageDetails,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";

interface UploadImageComponentProps {
  isLoading?: boolean;
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { singleDocumentDetails, uploadImageDetail } = useSelector(
    (state: RootState) => state.stepManagement
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    const url = URL.createObjectURL(selectedFile);
    dispatch(
      addImageToUploadImages({
        url,
        selectedFile,
        report_type: singleDocumentDetails.selectedSubType,
      })
    );
    dispatch(setUploadedImageDetails({ file: selectedFile, imageUrl: url }));
  }, []);

  const handleRemoveImage = () => {
    if (uploadImageDetail.imageUrl) {
      URL.revokeObjectURL(uploadImageDetail.imageUrl);
      dispatch(removeImageFromUploadImages(uploadImageDetail.imageUrl));
      dispatch(setUploadedImageDetails({ file: null, imageUrl: "" }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 w-full max-w-lg mx-auto flex flex-col justify-center items-center cursor-pointer ${
          isDragActive ? "bg-gray-100" : "bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here...</p>
        ) : (
          <>
            <p className="text-gray-500 text-sm">
              Drag & drop an image here, or click to select one
            </p>
            <p className="text-slate-800 font-extralight text-xs">
              {uploadImageDetail?.file?.name}
            </p>
            {isLoading && (
              <p className="text-xs font-light text-sky-900 mt-1">Loading...</p>
            )}
          </>
        )}
      </div>
      <AnimatePresence>
        {uploadImageDetail.imageUrl && (
          <div className="relative mt-4 w-full max-w-md">
            <motion.button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-gray-200 hover:shadow-lg focus:outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={uploadImageDetail.imageUrl}
                alt="Preview"
                width={600}
                height={400}
                className="border rounded-md"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadImageComponent;
