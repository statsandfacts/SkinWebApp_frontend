"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeUploadedImageDetails,
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.map((file) => {
        const url = URL.createObjectURL(file);
        return { file, imageUrl: url };
      });
      dispatch(setUploadedImageDetails(files));
    },
    [dispatch]
  );

  const handleRemoveImage = (imageUrl: string) => {
    URL.revokeObjectURL(imageUrl);
    dispatch(removeUploadedImageDetails(imageUrl));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // Allow images
      "application/pdf": [], // Allow PDFs if not a prescription
    },
    // singleDocumentDetails.selectedSubType === "Prescription"
    //   ? {
    //       "image/*": [], // Only images for prescription
    //     }
    //   : {
    //       "image/*": [], // Allow images
    //       "application/pdf": [], // Allow PDFs if not a prescription
    //     },
    multiple: true, // Allow multiple files
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
          <p className="text-blue-500">Drop the files here...</p>
        ) : (
          <>
            <p className="text-gray-500 text-sm">
              Drag & drop images or PDFs here, or click to select them
            </p>
            {isLoading && (
              <p className="text-xs font-light text-sky-900 mt-1">Loading...</p>
            )}
          </>
        )}
      </div>
      <AnimatePresence>
        {uploadImageDetail.length > 0 && (
          <div className="relative mt-4 w-full max-w-md grid grid-cols-1 gap-4 min-h-[10rem] max-h-96 overflow-y-auto">
            {uploadImageDetail.map((detail: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <motion.button
                  onClick={() => handleRemoveImage(detail.imageUrl)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-gray-200 hover:shadow-lg focus:outline-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </motion.button>
                {detail.file?.type === "application/pdf" ? (
                  <p className="text-gray-500 text-sm">
                    {detail.file?.name} (PDF)
                  </p>
                ) : (
                  <Image
                    src={detail.imageUrl}
                    alt={`Preview ${index}`}
                    width={600}
                    height={400}
                    className="border rounded-md"
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadImageComponent;
