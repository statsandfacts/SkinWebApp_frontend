import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  memberDetail: {},
  isCreateMemberModal: false,
  selectedTab: "Prescriptions",
};

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
    resetFamilyMember: (state) => {
      state.isCreateMemberModal = false;
    },
  },
});

export const {
  setPrescriptionDetailTab,
  resetFamilyMember,
  setCreateMemberModal,
} = familyMembersSlice.actions;

export default familyMembersSlice.reducer;
