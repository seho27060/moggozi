import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
// import { RootState } from "./store";

export interface Alert {
  check: number | null;
  createdTime: string | null;
  id: string | null;
  index: string | null;
  message: string | null;
  receiverId: string | null;
  receiverName: string | null;
  senderId: string | null;
  senderName: string | null;
  type: string | null;
}
interface AlertState {
  wsocket: WebSocket | null;
  alertList: Alert[];
  alertAllList: Alert[];
  realTimeAlert: boolean;
  isConnecting: boolean;
}

const initialAlertState: AlertState = {
  wsocket: null,
  alertList: [],
  alertAllList: [],
  realTimeAlert: false,
  isConnecting: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    setAlertList: (state, action) => {
      const loadedAlertList: Alert[] | null = [...action.payload];
      state.alertList = [...loadedAlertList];
    },
    checkAlertList: (state) => {
      const checkedAlertList = state.alertList.map((alert) => ({
        ...alert,
        check: 1,
      }));
      // console.log(checkedAlertList)
      state.alertList = [...checkedAlertList];
    },
    setRealTimeAlert: (state, action) => {
      // console.log("realtimealert set",action.payload);
      state.realTimeAlert = action.payload;
    },
    setAllAlertList: (state, action) => {
      const loadedAlertList: Alert[] | null = [...action.payload];
      state.alertAllList = [...loadedAlertList];
    },
  },
});

export const {
  setAlertList,
  setRealTimeAlert,
  setAllAlertList,
  checkAlertList,
} = alertSlice.actions;

export default alertSlice.reducer;
