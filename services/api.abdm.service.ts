import axios, { AxiosError } from "axios";
import { baseUrl, headers } from "./api.digitalPrescription.service";

export const abhaBaseUrl = process.env.NEXT_PUBLIC_ABHASBX_ABDM_URL;

/**
 *
 * @param payload {loginId}
 * @returns
 */
export const generateOtpThroughAadhar = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "generate-otp/",
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload {txnId, otpVal, mobile}
 * @returns
 */
export const createAbhaNumber = async (payload: any) => {
  const { data } = await axios.post(baseUrl + "verify-otp/", payload, headers);
  return data;
};

/**
 *
 * @param payload {txnId, loginId}
 * @returns
 */
export const updateAbdmLinkedMobileOtp = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "generate-mobile-otp/",
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param payload {txnId, otpVal}
 * @returns
 */
export const linkAbdmMobile = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "verify-mobile-otp/",
    payload,
    headers
  );
  return data;
};

/**
 *
 * @param xToken
 * @returns
 */
export const downloadAbhaCard = async (token: any) => {
  const abhaHeaders = {
    "X-Token": `Bearer ${token?.token}`,
    "Authorization": `Bearer ${token?.k_token}`,
    "request-id": crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  const { data } = await axios.get(abhaBaseUrl + "profile/account/abha-card", {
    headers: abhaHeaders,
  });
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const downloadAbha = async (xToken: any) => {
  const headerData = {
    headers: {
      token: xToken,
    },
  };

  const { data } = await axios.get(baseUrl + "download-abha/", headerData);
  return data;
};
