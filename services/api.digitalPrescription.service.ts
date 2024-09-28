import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_HOST_API_URL;

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
  const { data } = await axios.get(
    `${baseUrl}drug?id=${drug_id}`,
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