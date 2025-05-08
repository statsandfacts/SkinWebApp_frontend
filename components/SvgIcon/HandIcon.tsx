import React from "react";

interface SvgIconProps {
  color?: string;
  height?: string | number;
  width?: string | number;
}

const HandIcon: React.FC<SvgIconProps> = ({
  color = "currentColor",
  height = 24,
  width = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={height}
      width={width}
      fill={color}
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );
};

export default HandIcon;
