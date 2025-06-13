"use client";
import BackButton from "@/components/common/BackButton";
import { ToolTipBtn } from "@/components/common/ToolTipBtn";
import Loader from "@/components/Loader";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  setReuploadModal,
  setSingleCaseDetails,
  setSinglePrescriptionDetails,
  setViewOriginalImageModal,
  setViewPrescriptionDetailsModal,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  ArrowUpTrayIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { Chip } from "@heroui/chip";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { EyeIcon, ShieldAlertIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewPrescriptionDetailsModal from "../ViewPrescriptionDetailsModal";
import ViewOriginalPrescriptionImage from "../ViewOriginalPrescriptionImage";
import ReUploadImageModal from "../Details/ReUploadImageModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createChat, getChatByCaseId } from "@/services/app.chat";
import { setChatId } from "@/redux/slices/user.chats.slice";

const CasesDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prescriptionStatus = "unknown" }: { prescriptionStatus?: string } =
    useParams();
  const { userId } = useAuthInfo();
  const router = useRouter();

  const { dashboardData, loading, error, prescriptionCases } = useSelector(
    (state: RootState) => state.userDashboard
  );

  useEffect(() => {
    if (!dashboardData) {
      dispatch(fetchPatientDashboard(userId));
    }
  }, [dispatch, dashboardData]);

  const getCasesByStatus = () => {
    switch (prescriptionStatus) {
      case "approved":
        return prescriptionCases?.approved;
      case "conditionally-approved":
        return prescriptionCases?.conditionallyApproved;
      case "in-progress":
        return prescriptionCases?.inProgress;
      case "re-upload":
        return prescriptionCases?.reUpload;
      default:
        return [];
    }
  };

  const statusColorMap: any = {
    // vacation: "warning",
    approve: "success",
    "conditionally-approve": "#818cf8",
    hold: "#fb923c",
    reupload: "danger",
  };

  // console.log("getCasesByStatus()", getCasesByStatus());

  const handleCreateChat = async(payload: any) => {
    try{
      const response = await createChat(payload);
      // console.log("Chat created successfully:", response);
      router.push(`/dashboard/chats`);
    }catch (error) {
      toast.error("Failed to create chat. Please try again later.");
    }
  }

  const handleOpenChat = async(cases: any) => {
    dispatch(
      setSinglePrescriptionDetails(
        cases?.prescription_dtls[0]
      )
    );
    dispatch(setSingleCaseDetails(cases));
    // console.log("Single Prescription Details:", cases);
    // console.log("Payload for create chat", {
    //   case_id: cases?.case_id,
    //   participants: [userId, "1afe1faa-4306-425e-8fc2-72ede35d2cf4"], // Replace with actual pharmacist ID
    // });

    //check if chat already exists
    try{
      const response = await getChatByCaseId(cases?.case_id);
      // console.log("Chat response:", response);
      if(response.error){
        handleCreateChat({
          case_id: cases?.case_id,
          participants: [userId, "1afe1faa-4306-425e-8fc2-72ede35d2cf4"],
        });
      }else{
        router.push(`/dashboard/chats`);
        dispatch(setChatId(response));
      }
    }catch (error) {
      toast.error("Failed to fetch chat. Please try again later.");
      console.error("Error fetching chat:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-2">
        <div className="flex justify-start w-full ml-3 max-w-sm sm:max-w-5xl">
          <BackButton />
        </div>

        <div className="w-full max-w-sm overflow-auto sm:max-w-5xl">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 ml-3"> Error: {error} </p>
          ) : (
            <>
              {dashboardData && dashboardData?.show_case_details && (
                <section className="prescriptions-section mb-4">
                  <h2 className="text-lg font-bold capitalize text-sky-800 border-b border-sky-600 pb-3 mb-4 mx-2">
                    {prescriptionStatus?.replace("-", " ")} Prescriptions
                  </h2>
                  <div className="max-w-5xl px-4">
                    {getCasesByStatus().length > 0 ? (
                      // <Accordion variant="splitted">
                      //   {getCasesByStatus().map((cases: any, cx: number) => (
                      //     <AccordionItem
                      //       key={cx}
                      //       aria-label={cases?.case_id + cx}
                      //       title={
                      //         <span>
                      //           Status:{" "}
                      //           {["approve", "conditionally-approve"].includes(
                      //             cases?.status
                      //           )
                      //             ? `${cases?.status}d`
                      //             : cases?.status}{" "}
                      //           {cases?.reason && (
                      //             <span
                      //               className={`text-sm font-normal ${
                      //                 cases?.status === "hold"
                      //                   ? "text-orange-400"
                      //                   : "text-red-400"
                      //               }`}
                      //             >
                      //               ({cases?.reason})
                      //             </span>
                      //           )}
                      //         </span>
                      //       }
                      //       className={`border ${
                      //         cases?.status === "approve"
                      //           ? "border-green-400"
                      //           : cases?.status === "conditionally-approve"
                      //           ? "border-indigo-400"
                      //           : cases?.status === "hold"
                      //           ? "border-orange-400"
                      //           : cases?.status === "reupload"
                      //           ? "border-red-400"
                      //           : "border-yellow-400"
                      //       }`}
                      //     >
                      //       <div>
                      //         {cases?.prescription_dtls &&
                      //         cases?.prescription_dtls?.length > 0 ? (
                      //           <Table
                      //             removeWrapper
                      //             aria-label="Example static collection table"
                      //           >
                      //             <TableHeader>
                      //               <TableColumn>Name</TableColumn>
                      //               <TableColumn>Prescription Date</TableColumn>
                      //               <TableColumn>Prescription Type</TableColumn>
                      //               <TableColumn>Prescription</TableColumn>
                      //             </TableHeader>
                      //             <TableBody>
                      //               {cases?.prescription_dtls.map(
                      //                 (prescription: any, pi: number) => (
                      //                   <TableRow key={pi}>
                      //                     <TableCell className="capitalize">
                      //                       {dashboardData?.name}
                      //                     </TableCell>
                      //                     <TableCell>
                      //                       {cases?.upload_date}
                      //                     </TableCell>
                      //                     <TableCell>
                      //                       {prescription?.report_type
                      //                         ? prescription?.report_type
                      //                         : "Prescription"}
                      //                     </TableCell>
                      //                     <TableCell className="flex gap-2">
                      //                       {[
                      //                         "approve",
                      //                         "conditionally-approve",
                      //                       ].includes(cases?.status) && (
                      //                         <ToolTipBtn
                      //                           onClick={() => {
                      //                             dispatch(
                      //                               setSinglePrescriptionDetails(
                      //                                 prescription
                      //                               )
                      //                             );
                      //                             dispatch(
                      //                               setSingleCaseDetails(cases)
                      //                             );
                      //                             dispatch(
                      //                               setViewPrescriptionDetailsModal(
                      //                                 true
                      //                               )
                      //                             );
                      //                           }}
                      //                           title="View Prescription Details"
                      //                           key={1}
                      //                         >
                      //                           <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                      //                         </ToolTipBtn>
                      //                       )}

                      //                       {cases?.status === "reupload" && (
                      //                         <ToolTipBtn
                      //                           onClick={() => {
                      //                             dispatch(
                      //                               setSinglePrescriptionDetails(
                      //                                 prescription
                      //                               )
                      //                             );
                      //                             dispatch(
                      //                               setSingleCaseDetails(cases)
                      //                             );
                      //                             dispatch(
                      //                               setReuploadModal(true)
                      //                             );
                      //                           }}
                      //                           title="Reupload Your Prescription."
                      //                           color="danger"
                      //                           key={1}
                      //                         >
                      //                           <ArrowUpTrayIcon className="h-5 w-5" />
                      //                         </ToolTipBtn>
                      //                       )}

                      //                       <ToolTipBtn
                      //                         onClick={() => {
                      //                           dispatch(
                      //                             setSinglePrescriptionDetails(
                      //                               prescription
                      //                             )
                      //                           );
                      //                           dispatch(
                      //                             setViewOriginalImageModal(
                      //                               true
                      //                             )
                      //                           );
                      //                         }}
                      //                         title="Original Prescription Image"
                      //                         key={2}
                      //                       >
                      //                         <EyeIcon className="h-5 w-5" />
                      //                       </ToolTipBtn>
                      //                     </TableCell>
                      //                   </TableRow>
                      //                 )
                      //               )}
                      //             </TableBody>
                      //           </Table>
                      //         ) : (
                      //           <p className="text-slate-600 text-center text-xs">
                      //             No Prescription Uploaded For This Case.
                      //           </p>
                      //         )}
                      //       </div>
                      //     </AccordionItem>
                      //   ))}
                      // </Accordion>

                      <Table
                        removeWrapper
                        aria-label="Example static collection table"
                      >
                        <TableHeader>
                          <TableColumn>Prescription Date</TableColumn>
                          <TableColumn>Prescription Type</TableColumn>
                          <TableColumn>Status</TableColumn>
                          <TableColumn>Prescription</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {getCasesByStatus().map((cases: any, cx: number) => (
                            <TableRow key={cx}>
                              <TableCell>{cases?.upload_date}</TableCell>
                              <TableCell>
                                {cases?.prescription_dtls[0]?.report_type
                                  ? cases?.prescription_dtls[0]?.report_type
                                  : "Prescription"}
                              </TableCell>
                              {/* {cases?.status === "reupload" && (
                                <TableCell>
                                  {cases?.reason && (
                                    <span
                                      className={`text-sm font-normal ${
                                        cases?.status === "hold"
                                          ? "text-orange-400"
                                          : "text-red-400"
                                      }`}
                                    >
                                      ({cases?.reason})
                                    </span>
                                  )}
                                </TableCell>
                              )} */}

                              <TableCell>
                                <Chip
                                  size="sm"
                                  className="capitalize"
                                  variant="flat"
                                  classNames={{
                                    base: `${
                                      cases?.status === "approve"
                                        ? "bg-green-600"
                                        : cases?.status ===
                                          "conditionally-approve"
                                        ? "bg-green-700"
                                        : cases?.status === "hold"
                                        ? "bg-orange-600"
                                        : cases?.status === "reupload"
                                        ? "bg-red-600"
                                        : "bg-yellow-600"
                                    }`,
                                    content:
                                      "drop-shadow shadow-black text-white font-semibold",
                                  }}
                                >
                                  {cases?.status}
                                </Chip>
                              </TableCell>
                              <TableCell className="flex gap-2">
                                {cases?.reason && (
                                  <ToolTipBtn
                                    onClick={() => {}}
                                    title={cases?.reason}
                                    color="warning"
                                    key={1}
                                  >
                                    <ShieldAlertIcon className="h-5 w-5 font-bold text-yellow-800" />
                                  </ToolTipBtn>
                                )}

                                {["approve", "conditionally-approve"].includes(
                                  cases?.status
                                ) && (
                                  <>
                                  <ToolTipBtn
                                    onClick={() => {
                                      dispatch(
                                        setSinglePrescriptionDetails(
                                          cases?.prescription_dtls[0]
                                        )
                                      );
                                      dispatch(setSingleCaseDetails(cases));
                                      dispatch(
                                        setViewPrescriptionDetailsModal(true)
                                      );
                                    }}
                                    title="View Prescription Details"
                                    key={1}
                                  >
                                    <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                                  </ToolTipBtn>

                                  {/* <ToolTipBtn
                                    onClick={() => handleOpenChat(cases)}
                                    title="View chat"
                                    key={1}
                                  >
                                    <ChatBubbleLeftIcon className="h-5 w-5"/>
                                  </ToolTipBtn> */}
                                  </>
                                )}

                                {cases?.status === "reupload" && (
                                  <ToolTipBtn
                                    onClick={() => {
                                      dispatch(
                                        setSinglePrescriptionDetails(
                                          cases?.prescription_dtls[0]
                                        )
                                      );
                                      dispatch(setSingleCaseDetails(cases));
                                      dispatch(setReuploadModal(true));
                                    }}
                                    title="Reupload Your Prescription."
                                    color="danger"
                                    key={1}
                                  >
                                    <ArrowUpTrayIcon className="h-5 w-5" />
                                  </ToolTipBtn>
                                )}

                                <ToolTipBtn
                                  onClick={() => {
                                    dispatch(
                                      setSinglePrescriptionDetails(
                                        cases?.prescription_dtls[0]
                                      )
                                    );
                                    dispatch(setViewOriginalImageModal(true));
                                  }}
                                  title="Original Prescription Image"
                                  key={2}
                                >
                                  <EyeIcon className="h-5 w-5" />
                                </ToolTipBtn>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-slate-600 text-center text-xs">
                        No Prescription Uploaded Yet.
                      </p>
                    )}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
      <ViewPrescriptionDetailsModal />
      <ViewOriginalPrescriptionImage />
      <ReUploadImageModal />
    </>
  );
};

export default CasesDetails;
