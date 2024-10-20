"use client";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getInvestigationDetails } from "@/redux/slices/digitalPrescription/drug.slice";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
import MapInvestigationData from "./MapInvestigationData";

const InvestigationOverview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { investigationId } = useParams();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.drugs
  );

  const fetchDrugDetails = useCallback(() => {
    if (investigationId) {
      const id = Array.isArray(investigationId)
        ? investigationId[0]
        : investigationId;
      dispatch(getInvestigationDetails(id));
    }
  }, [dispatch, investigationId]);

  useEffect(() => {
    fetchDrugDetails();
  }, [fetchDrugDetails]);
  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 ml-3 text-center w-full"> Error: {error} </p>
      ) : (
        <MapInvestigationData data={data} />
      )}
    </div>
  );
};

export default InvestigationOverview;
