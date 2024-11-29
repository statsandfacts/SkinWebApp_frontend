"use client";
import BackButton from "@/components/common/BackButton";
import Loader from "@/components/Loader";
import UpdateHealthIndicatorsModal from "@/components/modal/UpdateHealthIndicatorsModal";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  fetchPatientDashboard,
  setUpdateHealthIndicatorModal,
} from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { HeartHandshake, PencilLine, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialStateData = {
  chronicDiseases: "",
  bloodGroup: "",
  heightFeet: "",
  heightInches: "",
  weight: "",
  isSmoking: "",
  isDrinking: "",

  date: null,
  value: null,
  value2: null,
  bpData: null,
  spo2_Data: null,
};

const GeneralHealthIndicator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.userDashboard
  );

  const [actionKey, setActionKey] = useState<string>("");
  const [updateData, setUpdateData] = useState(initialStateData);

  useEffect(() => {
    if (!dashboardData) {
      dispatch(fetchPatientDashboard(userId));
    } else {
    }
  }, [dispatch, dashboardData]);

  const EditClick = () => {
    setActionKey("edit");
    setUpdateData((prevState: any) => {
      const [_, feet = "", inches = ""] =
        dashboardData?.height?.match(/(\d+)\s*feet\s*(\d+)?\s*inch/) || [];

      return {
        ...prevState,
        bloodGroup: dashboardData?.blood_group,
        chronicDiseases: dashboardData?.chronic_diseases,
        isSmoking: dashboardData?.health_data?.smoking,
        isDrinking: dashboardData?.health_data?.drinking,
        weight: dashboardData?.weight,
        heightFeet: feet,
        heightInches: inches,
        spo2_Data: dashboardData?.health_data?.spo2,
        bpData: dashboardData?.health_data?.bp,
      };
    });
    dispatch(setUpdateHealthIndicatorModal(true));
  };

  const AddBP = (key: string) => {
    setActionKey(key);

    setUpdateData((prevState: any) => ({
      ...prevState,
      spo2_Data: dashboardData?.health_data?.spo2,
      bpData: dashboardData?.health_data?.bp,
      isSmoking: dashboardData?.health_data?.smoking,
      isDrinking: dashboardData?.health_data?.drinking,
    }));

    dispatch(setUpdateHealthIndicatorModal(true));
  };

  return (
    <>
      <div className="w-full flex justify-center flex-col items-center">
        <div className="flex justify-start w-full max-w-sm sm:max-w-7xl">
          <BackButton />
        </div>
        <div className="w-full bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col justify-center items-center max-w-sm sm:max-w-7xl cursor-pointer">
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex justify-center items-center">
              <HeartHandshake className="w-10 h-10 text-sky-600 transition-all duration-300 transform animate-bounce" />
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-700">
              Manage Your Health Indicators
            </div>
            <div className="mt-2 text-sm text-slate-500">
              Track health indicators and make informed decisions.
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 ml-3"> Error: {error} </p>
        ) : (
          <>
            <div className="w-full overflow-auto max-w-sm sm:max-w-5xl mt-4">
              <div>
                <div className="flex justify-end">
                  <button
                    className="flex items-center gap-1 text-slate-400"
                    onClick={EditClick}
                  >
                    <p className="font-medium text-sm">Edit</p>
                    <PencilLine className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="flex gap-2">
                    <span className="text-sm text-slate-600">Blood Group:</span>
                    <span className="text-sm text-slate-800">
                      {dashboardData?.blood_group}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-sm text-slate-600">
                      Chronic Diseases:
                    </span>
                    <span className="text-sm text-slate-800">
                      {dashboardData?.chronic_diseases}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-sm text-slate-600">Height:</span>
                    <span className="text-sm text-slate-800">
                      {dashboardData?.height}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-sm text-slate-600">Weight:</span>
                    <span className="text-sm text-slate-800">
                      {dashboardData?.weight} kg
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-sm text-slate-600">Smoking:</span>
                    <span className="text-sm text-slate-800">
                      {dashboardData?.health_data?.smoking}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-sm text-slate-600">Drinking:</span>
                    <span className="text-sm text-slate-800">
                      {dashboardData?.health_data?.drinking}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <h1>Blood Pressure</h1>
                  <button
                    className="flex items-center gap-1 text-slate-400"
                    onClick={() => AddBP("add_bp")}
                  >
                    <p className="font-medium text-sm">Add</p>
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <Table
                  removeWrapper
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Systolic (mm Hg)</TableColumn>
                    <TableColumn>Diastolic (mm Hg)</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {dashboardData?.health_data &&
                    dashboardData?.health_data?.bp?.length > 0
                      ? dashboardData?.health_data?.bp?.map(
                          (item: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{item?.date}</TableCell>
                              <TableCell>{item?.sys}</TableCell>
                              <TableCell>{item?.dia}</TableCell>
                            </TableRow>
                          )
                        )
                      : ""}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <h1>Pulse Oximetry</h1>
                  <button
                    className="flex items-center gap-1 text-slate-400"
                    onClick={() => AddBP("add_spo2")}
                  >
                    <p className="font-medium text-sm">Add</p>
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <Table
                  removeWrapper
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>SpO₂(%)</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {dashboardData?.health_data &&
                    dashboardData?.health_data?.spo2?.length > 0
                      ? dashboardData?.health_data?.spo2?.map(
                          (item: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{item?.date}</TableCell>
                              <TableCell>{item?.value}%</TableCell>
                            </TableRow>
                          )
                        )
                      : ""}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>

      <UpdateHealthIndicatorsModal
        actionKey={actionKey}
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
    </>
  );
};

export default GeneralHealthIndicator;
