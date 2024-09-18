import React from "react";
import { useSelector } from "react-redux";
import { Image } from "antd";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const UploadedImages: React.FC = () => {
  const { uploadImages } = useSelector(
    (state: any) => state.digitalPrescription
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-8"
    >
      {uploadImages.length > 0 ? (
        uploadImages.map((category: any) => (
          <React.Fragment key={category.docType}>
            <motion.h2
              variants={itemVariants}
              className="text-lg font-semibold text-slate-700"
            >
              {category.docType}
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 py-2"
            >
              {category.images.length > 0 ? (
                category.images.map((image: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-col justify-center items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-32 h-32"
                      initial={{ rotate: 5 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={image}
                        alt={"Upload Image :- " + index}
                        className="rounded-lg shadow-md object-cover"
                        style={{
                          width: "8rem",
                          height: "8rem",
                          objectFit: "cover",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  className="text-xs italic text-slate-500"
                  variants={itemVariants}
                >
                  No images uploaded for {category.docType}.
                </motion.p>
              )}
            </motion.div>
          </React.Fragment>
        ))
      ) : (
        <div className="h-60 flex justify-center items-center">
        <motion.p
          className="text-xs italic text-slate-500 text-center"
          variants={itemVariants}
        >
          No images uploaded yet.
        </motion.p>
        </div>
      )}
    </motion.div>
  );
};

export default UploadedImages;
