import React, { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import clsx from "clsx";

interface ChoosePrescriptionLayoutCardProps {
  header?: ReactNode; 
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}


const ChoosePrescriptionLayoutCard: React.FC<
  ChoosePrescriptionLayoutCardProps
> = ({ header, footer, className, children }) => {
  return (
    <Card className={clsx("w-96 max-w-[28rem] max-h-96", className)}>
      {header && (
        <>
          <CardHeader className="flex gap-3">{header}</CardHeader>
          <Divider />
        </>
      )}
      <CardBody>{children}</CardBody>
      {footer && (
        <>
          <Divider />
          <CardFooter>{footer}</CardFooter>
        </>
      )}
    </Card>
  );
};

export default ChoosePrescriptionLayoutCard;
