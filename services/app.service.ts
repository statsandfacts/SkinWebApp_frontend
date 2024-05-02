import { env } from '@/config/environment';
import axios, { AxiosError } from 'axios';

const baseUrl = env.BASE_URL;

/**
 *
 * @param payload
 * @returns
 */
export const CreateUser = async (payload: any) => {
  const { data } = await axios.post(baseUrl + 'users/create-user', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const login = async (payload: any) => {
  const { data } = await axios.post(baseUrl + 'users/user-login', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

/**
 *
 * @param payload
 * @returns
 */
export const LogoutUser = async (userId: string) => {
  try {
    const { data } = await axios.post(
      baseUrl + `users/logout-user?user_id=${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param userId
 * @returns
 */
export const getUser = async (userId: any) => {
  const { data } = await axios.get(
    baseUrl + `users/get-user?user_id=${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
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
export const EditUser = async (payload: any) => {
  try {
    const { data } = await axios.put(baseUrl + 'users/update-user', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getKeyCriteria = async () => {
  try {
    const { data } = await axios.get(
      baseUrl + 'level_value_mapping/view_key_criteria',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (e) {
    const axiosError = e as AxiosError; // Assert as AxiosError (if using Axios)
    if (axiosError.code === 'ECONNABORTED') {
      throw new Error('timeout');
    } else {
      throw e;
    }
  }
};

/**
 * http://www.nextcare.life:8000/api/v1/records/show_records?key_combination=674bbb600571c7e20af093f5ef2bfbe1
 * @returns
 */
export const showRecords = async (id: string) => {
  try {
    const { data } = await axios.get(
      baseUrl + 'records/show_records?key_combination=' + id,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError; // Assert as AxiosError (if using Axios)
    console.log(axiosError);
    if (axiosError.code === 'ECONNABORTED') {
      console.log('timeout');
      throw new Error('timeout');
    }

    // if (error.isAxiosError && error.response.status === 404) {
    //   throw new MyCustomError('Data not found on the server');
    // } else {
    //   // Handle other errors
    //   throw error;
    // }
  }
};

/**
 * http://www.nextcare.life:8000/api/v1/master_questionnaire/show_question_details
 * @param payload
 * @returns
 */
export const getQuestionary = async (payload: any) => {
  try {
    const { data } = await axios.post(
      baseUrl + 'master_questionnaire/show_question_details',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param payload
 * @returns
 */
export const saveQuestionnaire = async (payload: any) => {
  try {
    const { data } = await axios.post(
      baseUrl + 'users/save-user-questionnaire',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param payload
 * @returns
 */
export const createCase = async (payload: any) => {
  try {
    const { data } = await axios.post(baseUrl + 'case/create-case', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param payload
 * @returns
 */
export const getUserResponse = async ({ userId, session_id }: any) => {
  try {
    const { data } = await axios.get(
      baseUrl +
        `users/get-user-responses?user_id=${userId}&session_id=${session_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param userId
 * @returns
 */
export const getSessionList = async (userId: any) => {
  const { data } = await axios.get(
    baseUrl + `users/patient_dashboard?user_id=${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

/**
 *
 * @param caseId
 * @returns
 */
export const getCasePrescription = async (caseId: any) => {
  const { data } = await axios.get(
    baseUrl + `case/prescription?case_id=${caseId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};
/**
 *
 * @param caseId
 * @returns
 */
export const getCaseDetails = async (caseId: any) => {
  const { data } = await axios.get(
    baseUrl + `case/case-report?case_id=${caseId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};
