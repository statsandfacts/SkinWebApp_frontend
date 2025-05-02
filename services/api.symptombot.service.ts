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
export const getFirstQuestion = async () => {
  const { data } = await axios.get(
    baseUrl + "symptom/start",
  );
  return data;
};

export const getQuestion = async (payload: any) => {
    const { data } = await axios.post(
      baseUrl + "symptom/answer",
        payload,
        headers
    );
    return data;
};

export const endChat = async (payload: any) => {
  const { data } = await axios.post(
    baseUrl + "symptom/chat/end_and_summarize",
      payload,
      headers
  );
  return data;
};