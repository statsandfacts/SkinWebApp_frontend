"use client";
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { ToolTipBtn } from "@/components/common/ToolTipBtn";
import AddReminderModal from "@/components/DigitalPrescription/Details/Reminder/AddReminderModal";
import RefillReminderModal from "@/components/DigitalPrescription/Details/Reminder/RefillReminderModal";
import Loader from "@/components/Loader";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  setIsReminderModal,
  setReminderActionKey,
  setReminderDetails,
} from "@/redux/slices/digitalPrescription/drug.slice";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  deleteReminder,
  updateReminder,
  updateRefillReminder,
  deleteRefillReminder,
  setRefillReminder,
  fetchRefillReminders
} from "@/services/api.digitalPrescription.service";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  Bell,
  EyeIcon,
  PencilLine,
  PlusIcon,
  ShieldCheckIcon,
  ShieldXIcon,
  Trash2,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import moment from "moment";

const Reminders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();

  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.userDashboard
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedReminder, setSelectedReminder] = useState<any>(null);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const reminderData = dashboardData?.reminder_dtls || [];
  const [refillReminders, setRefillReminders] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      fetchRefillReminders(userId!).then((response) => {
        setRefillReminders(response || []);
        })
        .catch((error) => {
          console.error("Failed to fetch refill reminders", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (!dashboardData) {
      dispatch(fetchPatientDashboard(userId));
    }
  }, [dispatch, dashboardData]);

  useEffect(() => {
    console.log("Dashboard Data --->", dashboardData);
  }, [dashboardData]);
  
  const DeleteReminder = (reminder: any) => {
    if (reminder?.status === "") {
      toast.error("Reminder status missing.");
      return;
    }
    toast.promise(
      // deleteReminder(reminder?.id).then((response) => {
      //   dispatch(fetchPatientDashboard(userId));
      // })
      updateReminder({
        id: reminder?.id,
        status: !reminder?.status,
      }).then((response) => {
        dispatch(fetchPatientDashboard(userId));
      }),
      {
        pending: `${reminder?.status ? "inactive" : "Active"} reminder...`,
        success: `Reminder ${
          reminder?.status ? "inactive" : "Active"
        } successfully!`,
        error: `Failed to ${
          reminder?.status ? "inactive" : "Active"
        } reminder.`,
      }
    );
  };



  const EditViewReminder = (reminder: any, isActionKey: string) => {
    dispatch(setReminderActionKey(isActionKey));
    dispatch(setReminderDetails(reminder));
    dispatch(setIsReminderModal(true));
  };

  const openDeleteModal = (reminder: any) => {
    setSelectedReminder(reminder);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteReminder = () => {
    if (selectedReminder) {
      DeleteReminderMedicine(selectedReminder);
    }
  };

  const DeleteReminderMedicine = (reminder: any) => {
    if (!reminder?.id) {
      toast.error("Reminder ID is missing.");
      return;
    }
    toast.promise(
      deleteReminder(reminder?.id).then(() => {
        dispatch(fetchPatientDashboard(userId));
        setIsDeleteModalOpen(false);
      }),
      {
        pending: "Deleting medicine reminder...",
        success: "Medicine reminder deleted successfully!",
        error: "Failed to delete medicine reminder.",
      }
    );
  };

  

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-2">
        <div className="flex justify-start w-full max-w-sm sm:max-w-7xl">
          <BackButton />
        </div>

        <div className="w-full bg-gray-50 rounded-lg shadow-sm p-3 mb-10 flex flex-col justify-center items-center max-w-sm sm:max-w-7xl">
          <div className="flex justify-center items-center mt-2">
            <Bell className="w-10 h-10 text-sky-600 group-hover:text-sky-700 transition-all duration-500 transform group-hover:translate-y-[-8px] group-hover:scale-110 animate-bounce" />
          </div>
          <div className="text-lg font-semibold text-slate-700 group-hover:text-sky-700 transition-all duration-500 ease-in-out group-hover:translate-y-[-8px]">
            Set Medicine Reminder
          </div>
          <div className="text-sm text-slate-500 group-hover:text-sky-600 transition-all duration-500 ease-in-out group-hover:translate-y-[-8px]">
            Receive timely reminders for your medication schedule.
          </div>
          <div className="mt-2">
            <Button
              color="primary"
              className="rounded-lg"
              onPress={() => {
                dispatch(setReminderActionKey("create"));
                dispatch(setIsReminderModal(true));
              }}
            >
              Set Reminder
              <PlusIcon className="h-5 w-5" />{" "}
            </Button>
            <Button
              color="primary"
              className="rounded-lg ml-10"
              onPress={() => setIsRefillModalOpen(true)}
            >
              Refill Reminder
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-sm sm:max-w-5xl">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 ml-3"> Error: {error} </p>
          ) : (
            <>
              <section className="reports-section max-h-[200px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-gray-200">
                <h2 className="text-lg font-bold mb-4">Reminders Data</h2>
                <div>
                  {dashboardData &&
                  dashboardData?.reminder_dtls &&
                  dashboardData?.reminder_dtls.length > 0 ? (
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>Medicine Name</TableColumn>
                        <TableColumn>Start Date</TableColumn>
                        <TableColumn>Reminder Time</TableColumn>
                        <TableColumn>Days</TableColumn>
                        <TableColumn>Action</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.reminder_dtls.map(
                          (item: any, pi: number) => (
                            <TableRow key={pi}>
                              <TableCell className="capitalize">
                                {item?.medicine_name}
                              </TableCell>
                              <TableCell>{item?.reminder_start_date}</TableCell>
                              {/* <TableCell>{item?.reminder_time}</TableCell> */}
                              <TableCell>
                                {moment(item?.reminder_time, "HH:mm:ss").format(
                                  "hh:mm A"
                                )}
                              </TableCell>
                              <TableCell> {item?.reminder_days} </TableCell>
                              <TableCell className="flex gap-2">
                                <ToolTipBtn
                                  onClick={() => EditViewReminder(item, "view")}
                                  title="View"
                                  key={1}
                                  color="primary"
                                >
                                  <EyeIcon className="h-5 w-5" />
                                </ToolTipBtn>
                                <ToolTipBtn
                                  onClick={() => EditViewReminder(item, "edit")}
                                  title="Edit"
                                  key={2}
                                >
                                  <PencilLine className="h-5 w-5" />
                                </ToolTipBtn>
                                <ToolTipBtn
                                  onClick={() => DeleteReminder(item)}
                                  title={!item?.status ? "Inactive" : "Active"}
                                  key={3}
                                  color={!item?.status ? "danger" : "success"}
                                >
                                  {!item?.status ? (
                                    <ShieldXIcon className="h-5 w-5" />
                                  ) : (
                                    <ShieldCheckIcon className="h-5 w-5" />
                                  )}
                                </ToolTipBtn>
                                <ToolTipBtn
                                  onClick={() => openDeleteModal(item)}
                                  title="Delete"
                                  key={4}
                                  color={"danger"}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </ToolTipBtn>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-slate-600 text-center text-xs">
                      Please Add Reminder.
                    </p>
                  )}
                </div>
              </section>
             
             
<section className="reports-section max-h-[200px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-gray-200">
  <h2 className="text-lg font-bold mb-4">Refill Reminders Data</h2>
  <div>
    {refillReminders.length > 0 ? (
      <Table removeWrapper aria-label="Refill Reminder Table">
        <TableHeader>
          <TableColumn>Medicine Name</TableColumn>
          <TableColumn>Dosage</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>Days</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {refillReminders.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{item?.medicine_name || "-"}</TableCell>
              <TableCell>{item?.dosage || "-"}</TableCell>
              <TableCell>
                {item?.start_date
                  ? moment(item.start_date).format("DD-MM-YYYY")
                  : "-"}
              </TableCell>
              <TableCell>{item?.days || "-"}</TableCell>
              <TableCell className="flex gap-2">
               <ToolTipBtn
                  onClick={() => {
                    dispatch(setReminderDetails(item));
                    dispatch(setReminderActionKey("view"));
                    setIsRefillModalOpen(true);
                  }}
                  title="View"
                  key="view"
                  color="primary"
                >
                  <EyeIcon className="h-5 w-5" />
                </ToolTipBtn>

                <ToolTipBtn
                  onClick={() => {
                    dispatch(setReminderDetails(item));
                    dispatch(setReminderActionKey("edit"));
                    setIsRefillModalOpen(true);
                  }}
                  title="Edit"
                  key="edit"
                >
                  <PencilLine className="h-5 w-5" />
                </ToolTipBtn>

                <ToolTipBtn
                onClick={() => {
                  if (!userId) return; // prevent calling if userId is null
                  toast.promise(
                    updateRefillReminder({
                      id: item?.id,
                      status: !item?.status,
                    }).then(() => {
                      return fetchRefillReminders(userId).then((response) => {
                        setRefillReminders(response || []);
                      });
                    }),
                    {
                      pending: `${item?.status ? "Inactivating" : "Activating"} refill reminder...`,
                      success: `Refill reminder ${item?.status ? "inactivated" : "activated"} successfully!`,
                      error: `Failed to ${item?.status ? "inactivate" : "activate"} refill reminder.`,
                    }
                  );
                }}
                
                
                  title={!item?.status ? "Inactive" : "Active"}
                  key="status-toggle"
                  color={!item?.status ? "danger" : "success"}
                >
                  {!item?.status ? (
                    <ShieldXIcon className="h-5 w-5" />
                  ) : (
                    <ShieldCheckIcon className="h-5 w-5" />
                  )}
                </ToolTipBtn>

                <ToolTipBtn
               onClick={() => {
                if (!userId) return; // prevent calling if userId is null
                toast.promise(
                  deleteRefillReminder(item?.id).then(() => {
                    return fetchRefillReminders(userId).then((response) => {
                      setRefillReminders(response || []);
                    });
                  }),
                  {
                    pending: "Deleting refill reminder...",
                    success: "Refill reminder deleted successfully!",
                    error: "Failed to delete refill reminder.",
                  }
                );
              }}
              
                
                
                  title="Delete"
                  key="delete"
                  color="danger"
                >
                  <Trash2 className="h-5 w-5" />
                </ToolTipBtn>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <p className="text-slate-600 text-center text-xs">
        No Refill Reminders Found. Please Add Refill Reminder.
      </p>
    )}
  </div>
</section>


            </>
          )}
        </div>
      </div>

      <AddReminderModal />
      <RefillReminderModal
        isOpen={isRefillModalOpen}
        onClose={() => setIsRefillModalOpen(false)}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteReminder}
      />
    </>
  );
};

export default Reminders;
