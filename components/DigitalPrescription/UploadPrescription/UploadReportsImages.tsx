import React, { useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { uploadImageToAws } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { setLoginModal } from "@/redux/slices/loginModal.slice";
import { uploadImage } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadReportsImages: React.FC<UploadImageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { userId } = useAuthInfo();

  const [docType, setDocType] = useState<string>("Prescription");
  const [fileList, setFileList] = useState<{}[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocType(event.target.value);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (!userId) {
      toast.warning("Please Login ....");
      dispatch(setLoginModal(true));
      return;
    }
    // const mappedFiles = acceptedFiles.map((file) => {
    //   return {
    //     name: file.name,
    //     url: URL.createObjectURL(file),
    //     originFileObj: file,
    //   };
    // });
    // setFileList((prev: any) => [...prev, ...mappedFiles]);

    const formData = new FormData();
    formData.append("files", acceptedFiles[0]);

    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        dispatch(
          uploadImage({
            docType,
            image: response?.file_urls,
          })
        );
        toast.success("Prescription Image Uploaded Successfully.");
        onClose();
      })
      .catch((error) => {
        toast.error(
          error.response.data?.detail ||
            "Image Uploaded Failed, Please Try After Few Seconds."
        );
      })
      .finally(() => setLoading(false));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

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
                className="flex flex-col justify-center items-center pb-4"
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
                  <Radio value="Scan/CT Scan">Scan/CT Scan</Radio>
                  <Radio value="ECG echo ">ECG echo </Radio>
                </RadioGroup>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed p-4 w-full h-32 flex justify-center items-center rounded-lg ${
                    isDragActive ? "bg-blue-100" : "bg-gray-50"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here...</p>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <p>
                        Drag & drop some files here, or click to select files
                      </p>
                      {loading && <p className="text-xs text-slate-500 font-light " >Uploading ....</p>}
                    </div>
                  )}
                </div>

                {/* <div className="grid grid-cols-3 gap-4 mt-4 ">
                  {fileList.map((file, index) => (
                    <div key={index} className="flex flex-col" >
                      <Image
                        src={file.url || ""}
                        alt={file.name}
                        height={100}
                        width={100}
                        objectFit="cover"
                        className="rounded-md"
                      />
                      <p className="text-center text-sm">{file.name}</p>
                    </div>
                  ))}
                </div> */}
              </motion.div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UploadReportsImages;
