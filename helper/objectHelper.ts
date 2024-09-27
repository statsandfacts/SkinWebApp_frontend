export const transformDataToArray = (data: any): any[] => {
  return Object.keys(data || {}).map((section) => {
    const formattedSection = section
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      name: formattedSection,
      keyName: section,
      [section]: data[section], 
    };
  });
};
