import axios, { AxiosError } from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_SERVER_HOST_API_URL;

export const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 *
 * @param payload
 * @returns
 */
export const CreateUser = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "users/create-user",
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const updateUser = async (payload: any) => {
  const { data } = await axios.put(
    `${baseUrl}users/update-user`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const login = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "users/user-login",
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const userLogout = async () => {
  const { data } = await axios.post(baseUrl + "users/user-logout", {}, headers);
  return data;
};

// /**
//  *
//  * @param phone_number
//  * @returns
//  */
// export const verifyExistingUser = async (phone_number: string) => {
//   const { data } = await axios.get(
//     `${baseUrl}users/verify-existing-user?phone_number=${phone_number}`,
//     headers
//   );
//   return data;
// };

export const verifyExistingUser = async ({
  phone_number,
  email,
}: {
  phone_number?: string | undefined;
  email?: string | undefined;
}) => {
  const queryParams = new URLSearchParams();
  if (phone_number) queryParams.append("phone_number", phone_number);
  if (email) queryParams.append("email", email);

  const { data } = await axios.get(
    `${baseUrl}users/verify-existing-user?${queryParams.toString()}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload(phone_number)
 * @returns
 */
export const sendOtp = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}users/send_otp`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param userId
 * @returns
 */
export const getUser = async (userId: string) => {
  const { data } = await axios.get(
    baseUrl + `users/get-user?user_id=${userId}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const uploadImageToAws = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}document/upload-image/`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const createCase = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}case/create-case`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const updateCase = async (payload: any) => {
  const { data } = await axios.put(
    `${baseUrl}case/update-case`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const translateLanguage = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}translate/digital-prescription`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param case_id
 * @returns
 */
export const getCaseDetails = async (case_id: string) => {
  const { data } = await axios.get(
    `${baseUrl}case/get-case-details?case_id=${case_id}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const updatePrescription = async (payload: any) => {
  const { data } = await axios.put(
    `${baseUrl}prescription/update-prescription`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param patient_user_id
 * @returns
 */
export const getPatientDashboard = async (patient_user_id: string | null) => {
  const { data } = await axios.get(
    `${baseUrl}users/get-patient-dashboard?patient_user_id=${patient_user_id}`,
    headers
  );
  return data;
};

/**
 *
 * @param patient_user_id
 * @returns
 */
export const getProfileCompletionPercentage = async (
  patient_user_id: string | null
) => {
  const { data } = await axios.get(
    `${baseUrl}users/profile-completion-percentage?user_id=${patient_user_id}`,
    headers
  );
  return data;
};

/**
 *
 * @param drug_id
 * @returns
 */
export const fetchDrugDetails = async (drug_id: string | null) => {
  const { data } = await axios.get(
    `https://nextcare.life/api/api/stage1/drug/drug-data?id=${drug_id}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload {user_id, report_url }
 * @returns
 */
export const analyzeHealthReport = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}users/analyze-health-report`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload {pharmacy_id, customer_id }
 * @returns
 */
export const redeemDiscountToken = async (payload: any) => {
  const { data } = await axios.post(`${baseUrl}users/redeem`, payload, headers);
  return data;
};

/**
 *
 * @param investigation_id
 * @returns
 */
export const fetchInvestigationDetails = async (
  investigation_id: string | number | null
) => {
  const { data } = await axios.get(
    `${baseUrl}investigation/investigation-data?investigation_id=${investigation_id}`,
    headers
  );
  return data;
};

export const getAllBlogs = async () => {
  const { data } = await axios.get(`${baseUrl}blogs/all`, headers);
  return data;
};

export const getAllBlogsByCategory = async () => {
  const { data } = await axios.get(`${baseUrl}blogs/bycategories`, headers);
  return data;
};

export const getBlogDtls = async (blog_id: string) => {
  const { data } = await axios.get(
    `${baseUrl}blogs/?blog_id=${blog_id}`,
    headers
  );
  return data;
};

export const getBlogDtlsBySlug = async (blog_id: string) => {
  const { data } = await axios.get(
    `${baseUrl}blogs/blog-by-slug/?slug=${blog_id}`,
    headers
  );
  return data;
};

export const getRelatedBlogs = async (
  subcategory_slug: string | string[],
  exclude_blog_slug: string | string[]
) => {
  const { data } = await axios.get(
    `${baseUrl}blogs/related-by-subcategory?subcategory_slug=${subcategory_slug}&exclude_blog_slug=${exclude_blog_slug}`,
    headers
  );
  return data;
};

export const getAllCategories = async () => {
  const { data } = await axios.get(`${baseUrl}blogs/categories/all`, headers);
  return data;
};

// comments
export const createComment = (payload: any) => {
  return axios.post(`${baseUrl}blogs/comments/`, payload, headers);
};
export const updateComment = async (payload: any, comment_id: string) => {
  const { data } = await axios.put(
    `${baseUrl}blogs/comments/?comment_id=${comment_id}`,
    payload,
    headers
  );
  return data;
};
export const deleteComment = async (comment_id: string) => {
  const { data } = await axios.delete(
    `${baseUrl}blogs/comments/?comment_id=${comment_id}`,
    headers
  );
  return data;
};

// ? Family Member APIS
/**
 *
 * @param payload {user_id, member_name, relation, gender, phone_no, dob, email }
 * @returns
 */
export const createFamilyMember = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}users/family-member`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload {family_member_id, member_name, relation, gender, phone_no, dob, email,user_id }
 * @returns
 */
export const updateFamilyMember = async (payload: any) => {
  const { data } = await axios.put(
    `${baseUrl}users/family-member`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param family_member_id
 * @returns
 */
export const getFamilyMemberDtls = async (family_member_id: string | null) => {
  const { data } = await axios.get(
    `${baseUrl}users/family-member?family_member_id=${family_member_id}`,
    headers
  );
  return data;
};

/**
 *
 * @param user_id
 * @returns
 */
export const getFamilyMembers = async (user_id: string | null) => {
  const { data } = await axios.get(
    `${baseUrl}users/family-member/all?user_id=${user_id}`,
    headers
  );
  return data;
};

// ? Set Reminder APIS
/**
 *
 * @param payload {user_id, medicine_name, reminder_start_date, reminder_time, reminder_days }
 * @returns
 */
export const setReminder = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}users/reminder`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload {id, medicine_name, reminder_start_date, reminder_time, reminder_days  }
 * @returns
 */
export const updateReminder = async (payload: any) => {
  const { data } = await axios.put(
    `${baseUrl}users/reminder`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param id
 * @returns
 */
export const getReminderById = async (id: string | null) => {
  const { data } = await axios.get(
    `${baseUrl}users/reminder?id=${id}`,
    headers
  );
  return data;
};

/**
 *
 * @param id
 * @returns
 */
export const deleteReminder = async (id: string) => {
  const { data } = await axios.delete(
    `${baseUrl}users/reminder?id=${id}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload {name,email,phone_no,message }
 * @returns
 */
export const contactUs = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}contact/create`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload HCR data
 * @returns
 */
export const updateHcr = async (payload: any) => {
  const { data } = await axios.put(
    `${baseUrl}users/update-hcr`,
    payload,
    headers
  );
  return data;
};

export const emergencyContact = async (userId: string | null) => {
  const { data } = await axios.get(
    `${baseUrl}users/send_dynamic_message?user_id=${userId}`,
    headers
  );
  return data;
};

export const getSecurityQuestions = async (
  userId?: string | null,
  phone_no?: string | null
) => {
  let url;
  if (userId) {
    url = `${baseUrl}users/security-questions-answer?user_id=${userId}`;
  } else {
    url = `${baseUrl}users/security-questions-answer?phone_no=${phone_no}`;
  }
  const { data } = await axios.get(url, headers);
  return data;
};

export const securityAnswer = async (payload: any) => {
  const { data } = await axios.post(
    `${baseUrl}users/security-question`,
    payload,
    headers
  );
  return data;
};

export const verifySecurityAnswer = async (payload: {
  phone_no: string;
  answer: string;
  question_id: string;
}) => {
  const { data } = await axios.post(
    `${baseUrl}users/verify-security-question`,
    payload
  );
  return data;
};

/**
 *
 * @returns all career jobs list
 */
export const getAllCareerJobs = async () => {
  const { data } = await axios.get(
    `${baseUrl}career/get-all-jobs?status=Open`,
    headers
  );
  return data;
};

/**
 *  @param payload jobId
 * @returns all career jobs list
 */
export const getCareerJobById = async (jobId: string) => {
  const { data } = await axios.get(
    `${baseUrl}career/get-jobs-by-id?job_id=${jobId}`,
    headers
  );
  return data;
};

/**
 *
 * @param {string} keyword - The related keyword to search blogs
 * @returns related blogs based on the keyword
 */
export const findBlogsByKeyword = async (keyword: string) => {
  const { data } = await axios.get(
    `${baseUrl}blogs/find-related-key-word?related_key_word=${keyword}`,
    headers
  );
  return data;
};

/**
 *
 * @param {string} title - The title keyword to search blogs
 * @returns blogs that match the given title keyword
 */
export const searchBlogsByTitle = async (title: string) => {
  const { data } = await axios.get(
    `${baseUrl}blogs/search-by-title?keyword=${title}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload {user_id, url, report_type}
 * @returns
 */
export const digitizeSmartLabReport = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "report/slr/digitize-smart-lab-report",
    payload,
    headers
  );
  return data;
};

/**
 * Fetch Report data By report ID
 * @param reportId - The ID of the report
 * @returns Report data
 */
export const getReportDataById = async (reportId: string | null) => {
  const { data } = await axios.get(
    `${baseUrl}report/report-by-id?report_id=${reportId}`,
    headers
  );
  return data;
};

/**
 * Fetch country data from the server
 * @returns List of countries
 */
export const getCountryData = async () => {
  const { data } = await axios.get(`${baseUrl}users/countries`, headers);
  return data;
};

/**
 * Fetch salt composition data by drug ID
 * @param {string} Id - The ID of the drug (e.g., D1)
 * @returns {Promise<any>} - Salt composition data
 */
export const fetchSaltComposition = async (Id: string) => {
  const { data } = await axios.get(
    `${baseUrl}drug/salt-composition?id=${Id}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload { medicine_id: string, is_reminder_set: boolean }
 * @returns
 */
export const updateMedicineDetails = async (payload: {
  medicine_id: string;
  is_reminder_set: boolean;
}) => {
  const { data } = await axios.put(
    `${baseUrl}prescription/update-medicine-details`,
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload { user_id, medicine_name, medicine_o_id, dosage, start_date, days, is_active }
 * @returns
 */
export const setRefillReminder = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "refill-reminders/",
    payload,
    headers
  );
  return data;
};

// in api.digitalPrescription.service.ts

export const fetchRefillReminders = async (userId: string) => {
  const { data } = await axios.get(
    baseUrl + `refill-reminders/?user_id=${userId}`,
    headers
  );
  return data;
};

/**
 *
 * @param payload { reminder_id, user_id, medicine_name, medicine_o_id, dosage, start_date, days, is_active }
 * @returns
 */
export const updateRefillReminder = async (payload: any) => {
  const { data } = await axios.put(
    baseUrl + "refill-reminders/",
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param user_id string
 * @returns
 */
export const getRefillReminders = async (user_id: string) => {
  const { data } = await axios.get(
    baseUrl + `refill-reminders/?user_id=${user_id}`,
    headers
  );
  return data;
};

/**
 *
 * @param reminder_id string | number
 * @returns
 */
export const deleteRefillReminder = async (reminder_id: string | number) => {
  const { data } = await axios.delete(
    baseUrl + `refill-reminders/?reminder_id=${reminder_id}`,
    headers
  );
  return data;
};

/**
 * Fetches all doctors from the server.
 * @returns Array of doctor objects
 */
export const getAllDoctors = async () => {
  const { data } = await axios.get(`${baseUrl}doctors/get-all-doctor`, headers);
  return data;
};

/**
 * Fetches availability slots for a specific doctor by ID.
 * @param doctor_id - The unique ID of the doctor
 * @returns Array of availability entries
 */
export const getAvailabilityByDoctorId = async (doctor_id: string) => {
  const { data } = await axios.get(
    `${baseUrl}doctors/availability/?doctor_id=${doctor_id}`,
    headers
  );
  return data;
};

/**
 * @param payload {
 *   patient_id: string,
 *   doctor_id: string,
 *   appointment_date: string (YYYY-MM-DD),
 *   time: string (HH:mm:ss),
 *   purpose: string,
 *   appointment_type: string
 * }
 * @returns Promise<{ message: string, status: number }>
 */
export const bookAppointment = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "appointment/",
    payload,
    headers
  );
  return data;
};


/**
 * @param payload {
 *   appointment_id: string,
 *   amount: number
 * }
 * @returns Promise<{
 *   id: string;
 *   appointment_id: string;
 *   amount: number;
 *   status: string;
 *   method: string;
 *   razorpay_payment_id: string | null;
 *   created_at: string;
 *   updated_at: string;
 * }>
 */
export const initiatePayment = async (payload: {
  appointment_id: string;
  amount: number;
}) => {
  const { data } = await axios.post(
    baseUrl + "payment/initiate",
    payload,
    headers
  );
  return data;
};