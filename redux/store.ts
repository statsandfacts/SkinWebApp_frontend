import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/questionary.slice";
import loginModalSlice from "./slices/loginModal.slice";
import digitalPrescriptionReducer from "./slices/digitalPrescription/digitalPrescription.slice";
import familyMemberReducer from "./slices/digitalPrescription/familyMembers.slice";
import authReducer from "./slices/digitalPrescription/auth.slice";
import stepManagementReducer from "./slices/digitalPrescription/stepManagement.slice";
import userDashboardReducer from "./slices/digitalPrescription/userDashboard.slice";
import drugReducer from "./slices/digitalPrescription/drug.slice";
import blogReducer from "./slices/digitalPrescription/blog.slice";
import abdmReducer from "./slices/abdm.slics";
import careerReducer from "./slices/digitalPrescription/career.slice";
import saltCompositionReducer from "./slices/digitalPrescription/saltComposition.slice";
import symptomBotReducer from "./slices/symptomBot.slice";
import refillReminderReducer from "./slices/digitalPrescription/refillReminder.slice";
import symptomsReducer from "@/redux/slices/digitalPrescription/symptoms.slice";
import doctorsReducer from "@/redux/slices/digitalPrescription/doctors.slice";
import UserChatsReducer from "./slices/user.chats.slice";

export const store = configureStore({
  reducer: {
    questionary: counterReducer,
    loginModal: loginModalSlice,
    saltComposition: saltCompositionReducer,
    //for digital prescription
    digitalPrescription: digitalPrescriptionReducer,
    familyMember: familyMemberReducer,
    auth: authReducer,
    stepManagement: stepManagementReducer,
    userDashboard: userDashboardReducer,
    drugs: drugReducer,
    blogs: blogReducer,
    abdm: abdmReducer,
    career: careerReducer,
    symptomBot: symptomBotReducer,
    refillReminder: refillReminderReducer,
    symptoms: symptomsReducer,
    doctors: doctorsReducer,
    UserChats: UserChatsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
