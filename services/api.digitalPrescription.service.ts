import axios, { AxiosError } from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_SERVER_HOST_API_URL;

const headers = {
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

/**
 *
 * @param phone_number
 * @returns
 */
export const verifyExistingUser = async (phone_number: string) => {
  const { data } = await axios.get(
    `${baseUrl}users/verify-existing-user?phone_number=${phone_number}`,
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
    `${baseUrl}document/upload-image`,
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
 * @param drug_id
 * @returns
 */
export const fetchDrugDetails = async (drug_id: string | null) => {
  const { data } = await axios.get(`${baseUrl}drug?id=${drug_id}`, headers);
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

export const getBlogDtls = async (blog_id: string) => {
  const { data } = await axios.get(
    `${baseUrl}blogs/?blog_id=${blog_id}`,
    headers
  );
  return data;
};

// comments
export const createComment = (payload: any) => {
  return axios.post(`${baseUrl}blogs/comments`, payload, headers);
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
 * @param payload {family_member_id, member_name, relation, gender, phone_no, dob, email }
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
