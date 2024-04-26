'use client';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj: any) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: any) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}: any) => {
  const fileInputField = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState({});
  const [disabled, setDisable] = useState(false);

  useEffect(() => {
    if (Object.keys(files).length >= 3) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [files]);

  const handleUploadBtnClick = () => {
    if (fileInputField && fileInputField.current) {
      fileInputField.current?.click();
    }
  };

  const addNewFiles = (newFiles: File[]) => {
    const updatedFiles: { [key: string]: File } = { ...files };
    for (const file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        updatedFiles[file.name] = file;
      }
    }
    return updatedFiles;
  };

  const callUpdateFilesCb = (files: any) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e: any) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName: string) => {
    if (fileName in files) {
      delete files[fileName as keyof typeof files];
    }
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <div className='flex flex-col items-center rounded-lg bg-white p-4 border border-dashed border-gray-300 min-w-[80vw] md:min-w-[380px] h-25'>
        {/* Label */}

        {/* Drag & Drop Text */}
        <div className='font-bold text-center mb-4'>Upload Images</div>

        {/* Upload Button */}
        <button
          type='button'
          disabled={disabled}
          className='text-white rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700 focus:outline-none disabled:opacity-50 cursor-pointer flex items-center'
          onClick={handleUploadBtnClick}>
          <ArrowUpTrayIcon className='mr-2 h-6 w-6' />
          <span>Upload {otherProps.multiple ? 'files' : 'a file'}</span>
        </button>

        {/* File Input */}
        <input
          type='file'
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=''
          value=''
          {...otherProps}
          className='hidden' // Hide the input visually
        />

        {/* File Preview Container */}
        <div className='mt-4'>
          <div className='flex flex-wrap justify-center mt-2'>
            {Object.keys(files).map((fileName: string, index: number) => {
              const file: File = files[fileName as keyof typeof files];

              const isImageFile = file.type.split('/')[0] === 'image';

              return (
                <div
                  key={fileName}
                  className='w-1/4 rounded-lg mr-2 mb-2 flex relative'>
                  {isImageFile && (
                    <Image
                      className='rounded-lg w-full h-full object-cover'
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                      width={250}
                      height={250}
                    />
                  )}
                  <div
                    className={`absolute inset-0 rounded-lg bg-black opacity-50 flex items-center justify-center ${
                      !isImageFile ? 'hidden' : ''
                    }`}>
                    {/* Remove File Icon */}
                    <TrashIcon
                      className='h-6 w-6 text-white cursor-pointer hover:scale-110'
                      onClick={() => removeFile(fileName)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
