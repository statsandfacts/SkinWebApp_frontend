export interface SignUpDataState {
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

export interface AuthState {
  isModalOpen: boolean;
  userId: string;
  sessionId: string;
  userDetails: any;
  isTermConditionOpen: boolean;

  step: number;
  signUpProcess2Step: number;
  signUpData: SignUpDataState;
  pharmacyUserId: null | string;
  isRedeemDiscountOpen: boolean;
}
