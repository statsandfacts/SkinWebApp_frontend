import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "@/services/api.digitalPrescription.service";
import { removeLocalStorage, setLocalStorage } from "@/utils/localStore";
import {
  AuthState,
  SignUpDataState,
} from "@/types/digitalPrescription/auth.types";

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (userId: any) => {
    const response = await getUser(userId);
    return response.detail;
  }
);

const initialState: AuthState = {
  isModalOpen: false,
  userId: "",
  sessionId: "",
  userDetails: null,
  isTermConditionOpen: false,

  step: 0,
  signUpProcess2Step: 0,
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

  pharmacyUserId: null,
  isRedeemDiscountOpen: false,
  isRedeemPopoverOpen: false,
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
    setSignUpProcess2Step: (state, action: PayloadAction<number>) => {
      state.signUpProcess2Step = action.payload;
    },
    setSignUpData: (state, action: PayloadAction<SignUpDataState | any>) => {
      state.signUpData = { ...state.signUpData, ...action.payload };
    },
    setPharmacyUserId: (state, action: PayloadAction<any>) => {
      state.pharmacyUserId = action.payload;
    },
    setIsRedeemDiscount: (state, action: PayloadAction<boolean>) => {
      state.isRedeemDiscountOpen = action.payload;
    },
    setIsRedeemPopover: (state, action: PayloadAction<boolean>) => {
      state.isRedeemPopoverOpen = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.userDetails = action.payload;
    });
  },
});

export const {
  setLoginModal,
  setTermConditionModal,
  setUser,
  logOutUser,
  setStep,
  setSignUpProcess2Step,
  setSignUpData,
  setPharmacyUserId,
  setIsRedeemDiscount,
  setIsRedeemPopover,
} = authSlice.actions;
export default authSlice.reducer;
