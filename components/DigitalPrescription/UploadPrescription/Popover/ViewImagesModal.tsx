import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setViewImagesModalOpen,
  removeImageFromUploadImages,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";

export default function ViewImagesModal() {
  const dispatch = useDispatch();

  const { isViewImagesModal, singleDocumentDetails } = useSelector(
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
                {singleDocumentDetails.uploadImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-96 overflow-y-auto">
                    {singleDocumentDetails.uploadImages.map(
                      (image: { url: string }, index: number) => (
                        <div
                          key={index}
                          className="relative flex items-center justify-center group"
                        >
                          <button
                            onClick={() => handleRemoveImage(image.url)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md transition-transform transform group-hover:scale-110 group-hover:bg-gray-200 group-hover:shadow-lg focus:outline-none z-10"
                          >
                            <XMarkIcon className="h-6 w-6 text-gray-700" />
                          </button>

                          <Image
                            src={image.url}
                            alt={`Uploaded image ${index + 1}`}
                            width={250}
                            height={150}
                            className="w-full h-auto border rounded-md object-cover"
                          />
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
