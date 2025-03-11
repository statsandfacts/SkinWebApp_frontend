// @ts-ignore
import mergeImages from "merge-images";

interface ImageObject {
  src: string;
  height: number;
  width: number;
}

interface MergedImageResult {
  base64: string;
  file: File;
}

export const mergeImagesHelper = async (
  mergedImageArray: any[]
): Promise<MergedImageResult> => {
  try {
    const imagePromises: Promise<ImageObject>[] = mergedImageArray.map(
      (file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        return new Promise<ImageObject>((resolve) => {
          img.onload = () =>
            resolve({
              src: img.src,
              height: img.height,
              width: img.width,
            });
        });
      }
    );

    const imageArray: ImageObject[] = await Promise.all(imagePromises);

    if (imageArray.length === 0) {
      throw new Error("No images available to merge.");
    }

    // Calculate total height and prepare the config for merging
    let totalHeight = 0;
    const mergedArray = imageArray.map((img: ImageObject) => {
      const config = {
        src: img.src,
        x: 0,
        y: totalHeight,
      };
      totalHeight += img.height; // Stack images vertically
      return config;
    });

    // Merge images
    const base64 = await mergeImages(mergedArray, {
      width: imageArray[0].width, // Use the width of the first image
      height: totalHeight, // Total height based on stacked images
    });

    // Convert base64 to Blob and create a File object
    const res = await fetch(base64);
    const blob = await res.blob();
    const file = new File([blob], "merged_image.png", {
      type: "image/png",
    });

    return { base64, file }; // Return the base64 and the file
  } catch (error) {
    console.error("Error merging images:", error);
    throw error;
  }
};

export const base64ToFile = async (
  base64: string | null,
  filename = "image.png"
) => {
  const res = await fetch(base64 as any);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: blob.type });

  return { base64, file };
};
