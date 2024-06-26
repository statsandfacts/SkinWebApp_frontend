import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';

import type { GetProp, UploadFile, UploadProps } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { s3Client } from '@/utils/s3Upload';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { useDispatch } from 'react-redux';
import { deleteImages, uploadImages } from '@/redux/slices/questionary.slice';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const beforeUpload = (file: FileType) => {
    if (fileList.length > 3) {
      toast.error('You can only upload up to 3 files!');
      return false;
    }

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG files!');
      return Upload.LIST_IGNORE;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      toast.error('Image must be smaller than 1MB!');
      return Upload.LIST_IGNORE;
    }

    const isDuplicate = fileList.some(
      (f) => f.name === encodeURI(file.name) && f.size === file.size
    );
    if (isDuplicate) {
      toast.error('You cannot upload the same file twice!');
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const customRequest: UploadProps['customRequest'] = async ({
    file,
    onSuccess,
    onError,
    onProgress,
  }: any) => {
    if (!file) {
      return;
    }

    const params = {
      Bucket: 'nextcare.life',
      Key: encodeURI(file.name),
      Body: file,
    };

    try {
      onProgress(10);
      await s3Client.send(new PutObjectCommand(params));
      onProgress(50);
      if (onSuccess) {
        dispatch(uploadImages(encodeURI(file.name)));
        onProgress(100);
        onSuccess({
          name: encodeURI(file.name),
          url: 'https://nextcare.life/files/' + encodeURI(file.name),
        });

        toast.success('Image Uploaded Successfully');
      }
    } catch (error: any) {
      if (onError) {
        onError(error);
      }
      toast.error('Upload failed. Please try again.');
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
    }
  };

  const removePhoto = async (file: UploadFile) => {
    const params = {
      Bucket: 'nextcare.life',
      Key: encodeURI(file.name),
      Body: file,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(params));
      toast.success('Image Deleted Successfully');
      dispatch(deleteImages(encodeURI(file.name)));
      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        accept='image/*'
        listType='picture-card'
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        onRemove={removePhoto}
        maxCount={3}>
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          alt=''
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUpload;
