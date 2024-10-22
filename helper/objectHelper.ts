export const transformDataToArray = (data: any): any[] => {
  return Object.keys(data || {}).map((section) => {
    const formattedSection = section
      .split("_")
      .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
      .join(" ");

    return {
      name: formattedSection,
      keyName: section,
      [section]: data[section],
    };
  });
};

export const getFileType = (url: string | null): string => {
  if (!url) {
    return "unknown";
  }

  const extension = url.split(".").pop()?.toLowerCase();
  if (extension && ["jpg", "jpeg", "png", "gif"].includes(extension)) {
    return "image";
  } else if (extension === "pdf") {
    return "pdf";
  }

  return "unknown";
};
