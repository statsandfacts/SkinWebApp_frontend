
// import React, { useState } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
// } from "@heroui/modal";
// import { Input } from "@heroui/input";
// import { Button } from "@heroui/button";
// import * as Yup from "yup";
// import { useAuthInfo } from "@/hooks/useAuthInfo";
// import { useFormik } from "formik";
// import { setRefillReminder } from "@/services/api.digitalPrescription.service";
// import SearchMedicinePortal from "./SearchMedicinePortal";
// import { toast } from "react-toastify";
// import { useEffect } from "react";

// const RefillReminderModal = ({ isOpen, onClose, reminderData, actionKey }: any) => {

//   const { userId } = useAuthInfo();
//   const [loading, setLoading] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   useEffect(() => {
//     if ((actionKey === "edit" || actionKey === "view") && reminderData) {
//       formik.setValues({
//         medicineName: reminderData?.medicine_name || "",
//         medicine_name: reminderData?.medicine_name || "",
//         medicine_o_id: reminderData?.medicine_o_id || "",
//         dosage: reminderData?.dosage || "",
//         start_date: reminderData?.start_date || "",
//         days: reminderData?.days || "",
//         user_id: userId,
//       });
//     }
//   }, [reminderData, actionKey]);
  

//   const formik = useFormik({
//     initialValues: {
//       medicineName: "",
//       user_id: userId,
//       medicine_name: "",
//       medicine_o_id: "",
//       dosage: "",
//       start_date: "",
//       days: "",
//     },
//     validationSchema: Yup.object({
//       medicine_name: Yup.string().required("Medicine Name is required"),
//       medicine_o_id: Yup.string(),
//       dosage: Yup.string().required("Dosage is required"),
//       start_date: Yup.string().required("Start Date is required"),
//       days: Yup.string().required("Number of days is required"),
//     }),
//     onSubmit: async (values) => {
//       setLoading(true);
//       setSubmitError("");

//       try {
//         const response = await setRefillReminder(values);
//         toast.success(response.message);
//         onClose();
//       } catch (err) {
//         console.error("Failed to set reminder:", err);
//         setSubmitError("Failed to submit. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleMedicineChange = (medicine: any) => {
//     formik.setFieldValue("medicineName", medicine.name);
//     formik.setFieldValue("medicine_name", medicine.name);
//     formik.setFieldValue("medicine_o_id", medicine.Id);
//   };

//   return (
//     <Modal
//   isOpen={isOpen}
//   onClose={() => {
//     formik.resetForm();
//     setSubmitError("");
//     onClose();
//   }}
// >
//   <ModalContent>
//     <ModalHeader>Set Refill Reminder</ModalHeader>
//     <ModalBody>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="w-full mb-4">
//           <label htmlFor="medicineName" className="text-sm font-medium text-gray-900">
//             Medicine Name
//           </label>
//           <SearchMedicinePortal
//             selectedName={formik.values.medicineName}
//             handleOnChange={handleMedicineChange}
//              // Disable input in view mode
//           />
//           {formik.errors.medicineName && formik.touched.medicineName && (
//             <p className="text-red-500 text-sm">{formik.errors.medicineName}</p>
//           )}
//         </div>

//         <div className="w-full mb-4">
//           <label htmlFor="dosage" className="text-sm font-medium text-gray-900">
//             Dosage
//           </label>
//           <Input
//             id="dosage"
//             name="dosage"
//             onChange={formik.handleChange}
//             value={formik.values.dosage}
//             placeholder="Enter dosage"
//             className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-lg"
//             disabled={actionKey === "view"}  // Disable input in view mode
//           />
//           {formik.errors.dosage && formik.touched.dosage && (
//             <p className="text-red-500 text-sm">{formik.errors.dosage}</p>
//           )}
//         </div>

//         <div className="w-full mb-4">
//           <label htmlFor="start_date" className="text-sm font-medium text-gray-900">
//             Start Date
//           </label>
//           <Input
//             id="start_date"
//             name="start_date"
//             type="date"
//             onChange={formik.handleChange}
//             value={formik.values.start_date}
//             className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-lg"
//             disabled={actionKey === "view"}  // Disable input in view mode
//           />
//           {formik.errors.start_date && formik.touched.start_date && (
//             <p className="text-red-500 text-sm">{formik.errors.start_date}</p>
//           )}
//         </div>

//         <div className="w-full mb-4">
//           <label htmlFor="days" className="text-sm font-medium text-gray-900">
//             Days
//           </label>
//           <Input
//             id="days"
//             name="days"
//             type="number"
//             onChange={formik.handleChange}
//             value={formik.values.days}
//             placeholder="Enter number of days"
//             className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-lg"
//             disabled={actionKey === "view"}  
//           />
//           {formik.errors.days && formik.touched.days && (
//             <p className="text-red-500 text-sm">{formik.errors.days}</p>
//           )}
//         </div>

//         {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

//         {/* Conditionally render the submit button only when actionKey is "edit" */}
//         {actionKey !== "view" && (
//           <Button
//             type="submit"
//             className="mt-5 p-6 w-full text-white bg-sky-900 rounded-xl"
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Set Reminder"}
//           </Button>
//         )}
//       </form>
//     </ModalBody>
//   </ModalContent>
// </Modal>

//   );
// };

// export default RefillReminderModal;
// RefillReminderModal.tsx

import ShowPopover from "@/components/common/Popover";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsRefillReminderOpen,
  setRefillReminderActionKey,
  setRefillReminderData,
} from "@/redux/slices/digitalPrescription/refillReminder.slice";
import RefillReminderForm from "./RefillReminderForm";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useState } from "react";



const RefillReminderModal = () => {
  const dispatch = useDispatch();
  const { isRefillReminderOpen } = useSelector(
    (state: RootState) => state.refillReminder
  );
  const { userId } = useAuthInfo();
  const [refillReminders, setRefillReminders] = useState<any[]>([]);

  const handleClose = () => {
    dispatch(setIsRefillReminderOpen(false));
    dispatch(setRefillReminderActionKey(null));
    dispatch(setRefillReminderData(null));
  };

  return (
    <ShowPopover
      isOpen={isRefillReminderOpen}
      modalTitle="Refill Reminder"
      onOpenChange={handleClose}
      isConfirmButton={false}
      isCloseButton={false}
    >
      <RefillReminderForm onClose={handleClose} />
    </ShowPopover>
  );
};

export default RefillReminderModal;


// import ShowPopover from "@/components/common/Popover";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setIsRefillReminderOpen,
//   setRefillReminderActionKey,
//   setRefillReminderData,
// } from "@/redux/slices/digitalPrescription/refillReminder.slice";
// import RefillReminderForm from "./RefillReminderForm";
// import { RootState } from "@/redux/store";
// import { useAuthInfo } from "@/hooks/useAuthInfo";
// import { fetchRefillReminders } from "@/services/api.digitalPrescription.service";
// import { useState } from "react";

// const RefillReminderModal = () => {
//   const dispatch = useDispatch();
//   const { isRefillReminderOpen } = useSelector(
//     (state: RootState) => state.refillReminder
//   );
//   const { userId } = useAuthInfo();
//   const [refillReminders, setRefillReminders] = useState<any[]>([]);

//   const refreshRefillReminders = async () => {
//     if (userId) {
//       try {
//         const response = await fetchRefillReminders(userId);
//         setRefillReminders(response || []);
//       } catch (error) {
//         console.error("Failed to refresh refill reminders:", error);
//       }
//     }
//   };

//   const handleClose = () => {
//     dispatch(setIsRefillReminderOpen(false));
//     dispatch(setRefillReminderActionKey(null));
//     dispatch(setRefillReminderData(null));
//   };

//   return (
//     <ShowPopover
//       isOpen={isRefillReminderOpen}
//       modalTitle="Refill Reminder"
//       onOpenChange={handleClose}
//       isConfirmButton={false}
//       isCloseButton={false}
//     >
//       <RefillReminderForm refreshRefillReminders={refreshRefillReminders} />
//     </ShowPopover>
//   );
// };

// export default RefillReminderModal;
