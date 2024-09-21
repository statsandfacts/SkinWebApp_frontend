import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "@/services/api.digitalPrescription.service";
import { removeLocalStorage, setLocalStorage } from "@/utils/localStore";

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (userId: any) => {
    const response = await getUser(userId);
    return response.detail;
  }
);

interface SignUpDataState {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone_number: string;
  gender: string;
  marital_status: string;
  password_hash: string;
  uploaded_files: {
    doc_type: string;
    file_url: string;
  }[];
}

interface AuthState {
  isModalOpen: boolean;
  userId: string;
  sessionId: string;
  userDetails: any;
  isTermConditionOpen: boolean;

  step: number;
  signUpData: SignUpDataState;
}

const initialState: AuthState = {
  isModalOpen: false,
  userId: "",
  sessionId: "",
  userDetails: null,
  isTermConditionOpen: false,

  step: 1,
  signUpData: {
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    gender: "",
    marital_status: "",
    phone_number: "",
    password_hash: "",
    uploaded_files: [],
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setTermConditionModal: (state, action) => {
      state.isTermConditionOpen = action.payload;
    },
    setUser: (state, action) => {
      const { userId, sessionId } = action.payload;
      setLocalStorage("dpUserId", userId);
      setLocalStorage("dpSessionId", sessionId);
      state.userId = userId;
      state.sessionId = sessionId;
    },
    logOutUser: (state) => {
      removeLocalStorage("dpUserId");
      removeLocalStorage("dpSessionId");
      state.userId = "";
      state.sessionId = "";
      state.userDetails = null;
    },

    //? Step Management for signup process
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setSignUpData: (state, action: PayloadAction<SignUpDataState | any>) => {
      state.signUpData = { ...state.signUpData, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.userDetails = action.payload;
    });
  },
});

export const { setLoginModal, setTermConditionModal, setUser, logOutUser, setStep, setSignUpData } =
  authSlice.actions;
export default authSlice.reducer;
