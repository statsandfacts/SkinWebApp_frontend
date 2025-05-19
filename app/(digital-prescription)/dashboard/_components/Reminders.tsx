"use client";
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { ToolTipBtn } from "@/components/common/ToolTipBtn";
import AddReminderModal from "@/components/DigitalPrescription/Details/Reminder/AddReminderModal";
import RefillReminderModal from "@/components/DigitalPrescription/Details/Reminder/RefillReminderModal";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  setIsReminderModal,
  setReminderActionKey,
  setReminderDetails,
} from "@/redux/slices/digitalPrescription/drug.slice";
import {
  fetchRefillRemindersApi,
  setIsRefillReminderOpen,
  setRefillReminderActionKey,
  setRefillReminderData,
} from "@/redux/slices/digitalPrescription/refillReminder.slice";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  deleteReminder,
  updateReminder,
  updateRefillReminder,
  deleteRefillReminder,
  fetchRefillReminders,
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
  LoaderIcon,
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
import DeleteRefillReminderModal from "./DeleteRefillReminderModal";
import moment from "moment";

const Reminders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();

  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.userDashboard
  );
  const { rr_data, rr_error, rr_loading } = useSelector(
    (state: RootState) => state.refillReminder
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedReminder, setSelectedReminder] = useState<any>(null);

  const [isRefillDeleteModalOpen, setIsRefillDeleteModalOpen] =
    useState<boolean>(false);
  const [selectedRefillReminder, setSelectedRefillReminder] =
    useState<any>(null);

  const ToggleRefillReminder = (refillReminders: any) => {
    if (!refillReminders?.id) {
      toast.error("Refil Reminder ID is missing.");
      return;
    }
    toast.promise(
      updateRefillReminder({
        id: refillReminders?.id,
        is_active: !refillReminders?.is_active,
      }).then(() => {
        dispatch(fetchRefillRemindersApi(userId));
      }),
      {
        pending: `${
          refillReminders?.is_active ? "inactive" : "Active"
        } reminder...`,
        success: `Reminder ${
          refillReminders?.is_active ? "inactive" : "Active"
        } successfully!`,
        error: `Failed to ${
          refillReminders?.is_active ? "inactive" : "Active"
        } reminder.`,
      }
    );
  };

  useEffect(() => {
    if (!rr_data) {
      dispatch(fetchRefillRemindersApi(userId));
    }
  }, [dispatch, rr_data]);

  useEffect(() => {
    if (!dashboardData) {
      dispatch(fetchPatientDashboard(userId));
    }
  }, [dispatch, dashboardData]);

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

  const EditViewRefillReminder = (
    actionKey: "create" | "edit" | "view",
    data: any = null
  ) => {
    dispatch(setRefillReminderActionKey(actionKey));
    dispatch(setRefillReminderData(data));
    dispatch(setIsRefillReminderOpen(true));
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

  const openDeleteRefillModal = (refillReminders: any) => {
    setSelectedRefillReminder(refillReminders);
    setIsRefillDeleteModalOpen(true);
  };

  const confirmDeleteRefillReminder = () => {
    if (!selectedRefillReminder?.id || !userId) {
      toast.error("Missing refill reminder ID or user ID.");
      return;
    }

    toast.promise(
      deleteRefillReminder(selectedRefillReminder.id).then(() => {
        return fetchRefillReminders(userId).then((response) => {
          dispatch(fetchRefillRemindersApi(userId));
          setIsRefillDeleteModalOpen(false);
        });
      }),
      {
        pending: "Deleting refill reminder...",
        success: "Refill reminder deleted successfully!",
        error: "Failed to delete refill reminder.",
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
              // onPress={() => {
              //   dispatch(setRefillReminderActionKey("create"));
              //   dispatch(setIsRefillReminderOpen(true));
              onPress={() => EditViewRefillReminder("create")}
            >
              Refill Reminder
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-sm sm:max-w-5xl">
          {loading ? (
            <LoaderIcon className="flex justify-center items-center w-full animate-spin " />
          ) : error ? (
            <p className="text-red-500 ml-3"> Error: {error} </p>
          ) : (
            <>
              <section className="reports-section">
                <h2 className="text-lg font-bold">Medicine Reminders Data</h2>
                <div>
                  {dashboardData &&
                  dashboardData?.reminder_dtls &&
                  dashboardData?.reminder_dtls.length > 0 ? (
                    <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-gray-200 rounded">
                      <Table
                        removeWrapper
                        aria-label="Example static collection table"
                        classNames={{
                          table: "min-w-full",
                          thead: "sticky top-0 bg-white z-10",
                        }}
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
                                <TableCell>
                                  {item?.reminder_start_date}
                                </TableCell>
                                {/* <TableCell>{item?.reminder_time}</TableCell> */}
                                <TableCell>
                                  {moment(
                                    item?.reminder_time,
                                    "HH:mm:ss"
                                  ).format("hh:mm A")}
                                </TableCell>
                                <TableCell> {item?.reminder_days} </TableCell>
                                <TableCell className="flex gap-2">
                                  <ToolTipBtn
                                    onClick={() =>
                                      EditViewReminder(item, "view")
                                    }
                                    title="View"
                                    key={1}
                                    color="primary"
                                  >
                                    <EyeIcon className="h-5 w-5" />
                                  </ToolTipBtn>
                                  <ToolTipBtn
                                    onClick={() =>
                                      EditViewReminder(item, "edit")
                                    }
                                    title="Edit"
                                    key={2}
                                  >
                                    <PencilLine className="h-5 w-5" />
                                  </ToolTipBtn>
                                  <ToolTipBtn
                                    onClick={() => DeleteReminder(item)}
                                    title={
                                      !item?.status ? "Inactive" : "Active"
                                    }
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
                    </div>
                  ) : (
                    <p className="text-slate-600 text-center text-xs">
                      Please Add Reminder.
                    </p>
                  )}
                </div>
              </section>

              <section className="reports-section mt-3">
                <h2 className="text-lg font-bold ">Refill Reminders Data</h2>
                <div>
                  {rr_loading ? (
                    <LoaderIcon className="flex justify-center items-center w-full animate-spin " />
                  ) : rr_error ? (
                    <p className="text-red-500 ml-3"> Error: {error} </p>
                  ) : rr_data && rr_data.length > 0 ? (
                    <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-gray-200 rounded">
                      <Table
                        removeWrapper
                        aria-label="Refill Reminder Table"
                        classNames={{
                          table: "min-w-full",
                          thead: "sticky top-0 bg-white z-10",
                        }}
                      >
                        <TableHeader>
                          <TableColumn>Medicine Name</TableColumn>
                          <TableColumn>Dosage</TableColumn>
                          <TableColumn>Start Date</TableColumn>
                          <TableColumn>Days</TableColumn>
                          <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {rr_data.map((item: any) => (
                            <TableRow key={`${item.id}-${item.status}`}>
                              <TableCell>
                                {item?.medicine_name || "-"}
                              </TableCell>
                              <TableCell>{item?.dosage || "-"}</TableCell>
                              <TableCell>
                                {item?.start_date
                                  ? moment(item.start_date).format("DD-MM-YYYY")
                                  : "-"}
                              </TableCell>
                              <TableCell>{item?.days || "-"}</TableCell>
                              <TableCell className="flex gap-2">
                                <ToolTipBtn
                                  onClick={() =>
                                    EditViewRefillReminder("view", item)
                                  }
                                  title="View"
                                  color="primary"
                                  key={1}
                                >
                                  <EyeIcon className="h-5 w-5" />
                                </ToolTipBtn>
                                <ToolTipBtn
                                  onClick={() =>
                                    EditViewRefillReminder("edit", item)
                                  }
                                  title="Edit"
                                  key={2}
                                >
                                  <PencilLine className="h-5 w-5" />
                                </ToolTipBtn>

                                <ToolTipBtn
                                  onClick={() => ToggleRefillReminder(item)}
                                  title={
                                    !item?.is_active ? "Inactive" : "Active"
                                  }
                                  key={3}
                                  color={
                                    !item?.is_active ? "danger" : "success"
                                  }
                                >
                                  {!item?.is_active ? (
                                    <ShieldXIcon className="h-5 w-5" />
                                  ) : (
                                    <ShieldCheckIcon className="h-5 w-5" />
                                  )}
                                </ToolTipBtn>

                                <ToolTipBtn
                                  onClick={() => openDeleteRefillModal(item)}
                                  title="Delete"
                                  key={4}
                                  color="danger"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </ToolTipBtn>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
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
      <RefillReminderModal />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteReminder}
      />
      <DeleteRefillReminderModal
        isOpen={isRefillDeleteModalOpen}
        onClose={() => setIsRefillDeleteModalOpen(false)}
        onConfirm={confirmDeleteRefillReminder}
      />
    </>
  );
};

export default Reminders;
