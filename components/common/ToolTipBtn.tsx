import { Button, Tooltip } from "@nextui-org/react";

interface ToolTipBtnProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}
export const ToolTipBtn: React.FC<ToolTipBtnProps> = ({
  onClick,
  title,
  children,
}) => {
  return (
    <Tooltip showArrow={true} content={title}>
      <Button isIconOnly aria-label={title} onClick={onClick}>
        {children}
      </Button>
    </Tooltip>
  );
};
