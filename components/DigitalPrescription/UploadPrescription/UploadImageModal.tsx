import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { motion } from "framer-motion";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { sanitizeFileName } from "@/utils/sanitizeFileName";
import { s3ClientDP } from "@/utils/s3Upload";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, uploadImage } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { useUser } from "@/context/UserContext";
import { setLoginModal } from "@/redux/slices/loginModal.slice";

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImageModal: React.FC<UploadImageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { user: userId, userSession: sessionId } = useUser();
  const { uploadImages } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const [docType, setDocType] = useState<string>("Prescription");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocType(event.target.value);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const beforeUpload = (file: FileType) => {
    // if (!userId) { //? Check For User Login or not
    //   // dispatch(setLoginModal(true));
    //   return false;
    // }

    if (fileList.length > 15) {
      toast.error("You can only upload up to 3 files!");
      return false;
    }

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG files!");
      return Upload.LIST_IGNORE;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      toast.error("Image must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }

    const isDuplicate = fileList.some(
      (f) =>
        sanitizeFileName(f.name) === sanitizeFileName(file.name) &&
        f.size === file.size
    );
    if (isDuplicate) {
      toast.error("You cannot upload the same file twice!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    if (file.status === "removed") {
      return;
    }
    setFileList([...newFileList]);
  };

  const customRequest: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
    onProgress,
  }: any) => {
    if (!file) {
      return;
    }
    const uniqueFileName =
      (file.uid ? file.uid : "_") + sanitizeFileName(file.name);
    const params = {
      Bucket: "next-care-digital-prescription",
      Key: uniqueFileName,
      Body: file,
    };

    try {
      onProgress(10);
      // await s3ClientDP.send(new PutObjectCommand(params));
      // onProgress(50);
      // if (onSuccess) {
      //   onProgress(100);
      //   const imageObject = {
      //     name: uniqueFileName,
      //     url:
      //       "https://next-care-digital-prescription.s3.ap-south-1.amazonaws.com/" +
      //       uniqueFileName,
      //   };
      //   onSuccess(imageObject);
      //   dispatch(
      //     uploadImage({
      //       docType,
      //       image: imageObject,
      //     })
      //   );
      //   toast.success("Image Uploaded Successfully");
      // }
    } catch (error: any) {
      if (onError) {
        onError(error);
      }
      toast.error("Upload failed. Please try again.");
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
    }
  };

  const removePhoto = async (file: UploadFile) => {
    const fileName = (file.uid ? file.uid : "_") + sanitizeFileName(file.name);
    const params = {
      Bucket: "next-care-digital-prescription",
      Key: fileName,
    };

    try {
      // await s3ClientDP.send(new DeleteObjectCommand(params));
      // toast.success("Image Deleted Successfully");
      // dispatch(deleteImage({ docType, imageName: fileName }));
      // const newFileList = fileList.filter((item) => item.uid !== file.uid);
      // setFileList(newFileList);
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const uploadButton = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ border: 0, background: "none" }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </motion.button>
  );

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ModalHeader className="flex flex-col gap-1">
                Upload Your Prescription Image
              </ModalHeader>
            </motion.div>
            <ModalBody>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col justify-center items-center"
              >
                <RadioGroup
                  value={docType}
                  onChange={handleOptionChange}
                  label="Select the type of document you are uploading:"
                  className="flex items-center gap-4 mb-4 text-sm md:text-lg"
                  orientation="horizontal"
                  size="sm"
                >
                  <Radio value="Prescription">Prescription</Radio>
                  <Radio value="Test Reports">Test Reports</Radio>
                  <Radio value="Scan/CT Scan">Scan/CT Scan</Radio>
                </RadioGroup>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  customRequest={customRequest}
                  onRemove={removePhoto}
                  maxCount={15}
                >
                  {fileList.length >= 15 ? null : uploadButton}
                </Upload>
              </motion.div>
            </ModalBody>
            <ModalFooter>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center gap-2"
              >
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="bg-sky-900 hover:bg-sky-700"
                  onPress={onClose}
                >
                  Upload & Close
                </Button>
              </motion.div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UploadImageModal;
