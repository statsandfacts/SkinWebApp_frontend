import ExplanationModal from '@/components/SymptomBot/ExplanationModal';
import { createSlice } from '@reduxjs/toolkit';

interface ChatsinitialState {
    chatResponseData: any;
}

const initialState: ChatsinitialState = {
  chatResponseData: null,
}

export const UserChatsSlice = createSlice({
  name: 'ChatsData',
  initialState,
  reducers: {
    setChatId: (state, action) => {
        state.chatResponseData = action.payload;
    },
  },
});

export const { setChatId } = UserChatsSlice.actions;
export default UserChatsSlice.reducer;
