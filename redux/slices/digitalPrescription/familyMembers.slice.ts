import { getFamilyMembers } from "@/services/api.digitalPrescription.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FamilyMembersState {
  memberDetail: Record<string, any>;
  isCreateMemberModal: boolean;
  selectedTab: string;
  familyMembers: {
    data: any[];
    loading: boolean;
    errorMessage: string | null;
  };
}

const initialState: FamilyMembersState = {
  memberDetail: {},
  isCreateMemberModal: false,
  selectedTab: "Prescriptions",
  familyMembers: {
    data: [],
    loading: false,
    errorMessage: null,
  },
};

export const fetchFamilyMembers = createAsyncThunk(
  "familyMembers/fetchFamilyMembers",
  async (user_id: string | null, { rejectWithValue }) => {
    try {
      const response = await getFamilyMembers(user_id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch family members"
      );
    }
  }
);

const familyMembersSlice = createSlice({
  name: "familyMembers",
  initialState,
  reducers: {
    setPrescriptionDetailTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setCreateMemberModal: (state, action) => {
      state.isCreateMemberModal = action.payload;
    },
    setSingleMember: (state, action) => {
      state.memberDetail = action.payload;
    },
    resetFamilyMember: (state) => {
      state.isCreateMemberModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyMembers.pending, (state) => {
        state.familyMembers.loading = true;
        state.familyMembers.errorMessage = null;
        state.familyMembers.data = [];
      })
      .addCase(
        fetchFamilyMembers.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.familyMembers.loading = false;
          state.familyMembers.data = action.payload ?? [];
          state.familyMembers.errorMessage = null;
        }
      )
      .addCase(fetchFamilyMembers.rejected, (state, action) => {
        state.familyMembers.loading = false;
        state.familyMembers.errorMessage = action.payload as string;
        state.familyMembers.data = [];
      });
  },
});

export const {
  setPrescriptionDetailTab,
  resetFamilyMember,
  setCreateMemberModal,
  setSingleMember,
} = familyMembersSlice.actions;

export default familyMembersSlice.reducer;
