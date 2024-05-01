'use client';
import React, { useEffect, useState } from 'react';
import FileUpload from './File';
import AWS from 'aws-sdk';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

import Loader from '../Loader';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteImages, uploadImages } from '@/redux/slices/questionary.slice';

// const S3_BUCKET = 'nextcare.life'; // Replace with your bucket name
// const REGION = 'us-east-2'; // Replace with your region

const S3_BUCKET = 'nextcare.life'; // Replace with your bucket name
const REGION = 'us-east-2'; // Replace with your region

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAZI2LCNUH7TCAU7XU',
    secretAccessKey: 'IPfV7fxJHyRwOY54PHbqanocBoBvUAg9Dj54HLTH',
  },
});

// AWS.config.update({
//   accessKeyId: 'AKIAZI2LCNUH7TCAU7XU',
//   secretAccessKey: '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',
// });

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Photo = () => {
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);

  const [images, settImages] = useState({
    uploadFile: [],
  });

  const updateUploadedFiles = async (files: any) => {
    const previousFiles = images.uploadFile;
    settImages({ ...images, uploadFile: files });

    const addedFiles = files.filter(
      (file: File) =>
        !previousFiles.some((prevFile: File) => prevFile.name === file.name)
    );
    const deletedFiles = previousFiles.filter(
      (prevFile: File) =>
        !files.some((file: File) => file.name === prevFile.name)
    );

    if (addedFiles.length > 0) {
      await uploadImage(addedFiles);
    }

    if (deletedFiles.length > 0) {
      await deleteImagesFromS3(deletedFiles);
    }
  };

  const uploadImage = async (image: any) => {
    const file: File = image[0];
    setUploading(true);

    if (file) {
      const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
      };

      try {
        // await s3.putObject(params).promise();
        await s3Client.send(new PutObjectCommand(params));

        setUploading(false);
        toast.success('Image Uploaded Successfully');
        dispatch(uploadImages(file.name));
      } catch (error: any) {
        console.error(error);
        setUploading(false);
        alert('Error uploading file: ' + error.message); // Inform user about the error
      }
    }
  };

  const deleteImagesFromS3 = async (image: any) => {
    const file: File = image[0];
    setUploading(true);

    if (file) {
      const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
      };

      try {
        // await s3.deleteObject(params).promise();
        await s3Client.send(new DeleteObjectCommand(params));
        setUploading(false);
        toast.success('Image Deleted Successfully');
        dispatch(deleteImages(file.name));
      } catch (error: any) {
        console.error(error);
        setUploading(false);
        alert('Error uploading file: ' + error.message); // Inform user about the error
      }
    }
  };

  return (
    <div>
      {uploading && <Loader />}
      <FileUpload
        accept='.jpg,.png,.jpeg'
        label='Profile Image(s)'
        multiple
        updateFilesCb={updateUploadedFiles}
      />
      {/* <button onClick={createCase}>submit</button> */}
    </div>
  );
};

export default Photo;
