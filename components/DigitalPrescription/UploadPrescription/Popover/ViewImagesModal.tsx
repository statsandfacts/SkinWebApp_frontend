import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
// import Image from "next/image";
import { XMarkIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setViewImagesModalOpen,
  removeImageFromUploadImages,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { Image } from "antd";

export default function ViewImagesModal() {
  const dispatch = useDispatch();

  const { isViewImagesModal, afterUploadedDocDataWithType } = useSelector(
    (state: RootState) => state.stepManagement
  );

  const onClose = () => {
    dispatch(setViewImagesModalOpen(false));
  };

  const handleRemoveImage = (imageUrl: string) => {
    dispatch(removeImageFromUploadImages(imageUrl));
  };

  return (
    <>
      <Modal size={"3xl"} isOpen={isViewImagesModal} onClose={onClose}>
        <ModalContent className="mb-20">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Uploaded Images
              </ModalHeader>
              <ModalBody className="min-h-[10rem]">
                {afterUploadedDocDataWithType.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-96 overflow-y-auto">
                    {afterUploadedDocDataWithType.map(
                      (
                        image: { file_url: string; doc_type: string },
                        index: number
                      ) => (
                        <div key={index} className="relative flex group">
                          {/* <button
                            onClick={() => handleRemoveImage(image.file_url)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md transition-transform transform group-hover:scale-110 group-hover:bg-gray-200 group-hover:shadow-lg focus:outline-none z-10"
                          >
                            <XMarkIcon className="h-6 w-6 text-gray-700" />
                          </button> */}
                          {image.doc_type === "Prescription" ? (
                            <Image
                              src={image.file_url}
                              alt={`Uploaded image ${index + 1}`}
                              width={300}
                              height={300}
                              className="w-full h-auto border rounded-md object-cover"
                            />
                          ) : (
                            <a
                              href={image.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col justify-center items-center border rounded-md w-full h-[300px] bg-gray-100 p-4"
                            >
                              <DocumentIcon className="h-16 w-16 text-gray-500" />
                              <p className="mt-2 text-gray-700">
                                {image.doc_type} Document
                              </p>
                            </a>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 h-full">
                    No images found. Please upload images to view them here.
                  </p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
