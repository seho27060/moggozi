import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
// import { RootState } from "./store";

const initialAlertModalState = {
  wsocket: null,
  alertList: [],
  alertAllList: [],
  realTimeAlert: false,
  isConnecting: false,
};

export const alertModalSlice = createSlice({
  name: "alertModal",
  initialState: initialAlertModalState,
  reducers: {
    setAlertModalOpen: (state, action) => {},
  },
});

export const { setAlertModalOpen } = alertModalSlice.actions;

export default alertModalSlice.reducer;
