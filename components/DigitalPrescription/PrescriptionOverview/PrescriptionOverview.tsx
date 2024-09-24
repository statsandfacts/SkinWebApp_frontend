import React from "react";

interface PrescriptionOverviewProps {
  medicineName: string;
}

const PrescriptionOverview: React.FC<PrescriptionOverviewProps> = ({
  medicineName,
}) => {
  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}
    >
      <h2>{`Prescription Overview for ${medicineName}`}</h2>
    </div>
  );
};

export default PrescriptionOverview;
