import axios, { AxiosError } from "axios";

export const baseUrl = "http://localhost:5001/";

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
export const createChat = async (payload: {case_id: string, participants: string[]}) => {
  const { data } = await axios.post(
    baseUrl + "api/chats",
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
export const getChatByCaseId = async (payload: string) => {
    const { data } = await axios.get(
      baseUrl + `api/chats/case/${payload}`,
    );
    return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const getChatByUserId = async (payload: string) => {
    const { data } = await axios.get(
      baseUrl + `api/chats/user/${payload}`,
    );
    return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const getChatByChatId = async (payload: string) => {
    const { data } = await axios.get(
      baseUrl + `api/messages/${payload}`,
    );
    return data;
};