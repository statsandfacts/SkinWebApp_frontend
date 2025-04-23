import { Button, Tooltip } from "@heroui/react";

interface ToolTipBtnProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

export const ToolTipBtn: React.FC<ToolTipBtnProps> = ({
  onClick,
  title,
  children,
  color = "default",
}) => {
  return (
    <Tooltip showArrow={true} content={title}>
      <Button isIconOnly color={color} aria-label={title} onClick={onClick}>
        {children}
      </Button>
    </Tooltip>
  );
};
