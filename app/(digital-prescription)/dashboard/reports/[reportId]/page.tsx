"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchPatientDashboard,
} from "@/redux/slices/digitalPrescription/userDashboard.slice";
import {
  setSinglePrescriptionDetails,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import SLRModalContent from "@/components/DigitalPrescription/Details/Report/SLRModalContent";

const ReportDetailsPage = () => {
  const { reportId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { dashboardData } = useSelector((state: RootState) => state.userDashboard);

  useEffect(() => {
    if (!dashboardData) {
      // Replace with real userId logic if needed
      const userId = localStorage.getItem("userId");
      if (userId) dispatch(fetchPatientDashboard(userId));
    }
  }, [dispatch, dashboardData]);

  useEffect(() => {
    if (dashboardData?.unmapped_report_dtls?.length > 0) {
      const report = dashboardData.unmapped_report_dtls.find(
        (r: any) => String(r?.ocr_op?.report_id) === String(reportId)
      );
      if (report) dispatch(setSinglePrescriptionDetails(report));
    }
  }, [dashboardData, reportId, dispatch]);

  return (
    <div className="p-4">
      <SLRModalContent />
    </div>
  );
};

export default ReportDetailsPage;
