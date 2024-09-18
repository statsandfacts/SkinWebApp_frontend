"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "@/utils/localStore";
import { fetchUserDetails } from "@/redux/slices/digitalPrescription/auth.slice";
import { AppDispatch, RootState } from "@/redux/store";

export const useAuthInfo = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    userId: reduxUserId,
    sessionId: reduxSessionId,
    userDetails,
  } = useSelector((state: RootState) => state.auth);

  const localStorageUserId = getLocalStorage("dpUserId") as string | null;
  const localStorageSessionId = getLocalStorage("dpSessionId") as string | null;

  const userId: string | null = reduxUserId
    ? reduxUserId
    : localStorageUserId || null;
  const sessionId: string | null = reduxSessionId
    ? reduxSessionId
    : localStorageSessionId || null;

  useEffect(() => {
    if (userId && typeof userId === "string" && !userDetails) {
      dispatch(fetchUserDetails(userId));
    }
  }, [userId, userDetails, dispatch]);

  return {
    userId,
    sessionId,
    userDetails,
  };
};
