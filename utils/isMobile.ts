export default function isMobile() {
  if (typeof window !== "undefined") {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }
  return false;
}

export const getColorThroughPercentage = (percentage: number | null) => {
  if (percentage == null || percentage < 0) return "default";

  if (percentage < 20) return "danger";
  if (percentage < 50) return "warning";
  if (percentage < 80) return "secondary";

  return "primary";
};
