import { createSlice } from "@reduxjs/toolkit";

interface AbdmState {
  abhaImageData: any;
  abhaImageUrl: any;
}

const initialState: AbdmState = {
  abhaImageData: null,
  abhaImageUrl: null,
};

const abdmSlice = createSlice({
  name: "abdm",
  initialState,
  reducers: {
    setAbhaImages: (state, action) => {
      state.abhaImageUrl = action.payload;
    },
    setAbhaImagesData: (state, action) => {
      state.abhaImageData = action.payload;
    },
  },
});

export const { setAbhaImagesData, setAbhaImages } = abdmSlice.actions;

export default abdmSlice.reducer;
