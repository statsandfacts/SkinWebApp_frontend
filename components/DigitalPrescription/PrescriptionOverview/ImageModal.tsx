"use client";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  selectedIndex,
  onSelect,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>
          <div className="text-lg font-semibold">Image Viewer</div>
        </ModalHeader>

        <ModalBody>
          <div className="flex h-[70vh] gap-4">
            {/* Main Image */}
            <div className="flex-1 relative bg-black/5 rounded">
              <Image
                src={images[selectedIndex]}
                alt={`Image ${selectedIndex}`}
                fill
                className="object-contain rounded"
              />
            </div>

            {/* Scrollable Thumbnails */}
            <div className="w-28 overflow-y-auto space-y-2 pr-1">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => onSelect(index)}
                  className={`relative w-full aspect-square rounded cursor-pointer border ${
                    index === selectedIndex
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded text-sm"
          >
            Close
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
