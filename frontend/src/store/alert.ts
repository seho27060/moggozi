import { createSlice } from "@reduxjs/toolkit";

export interface AlertSend {
  senderId: number|null,
  receiverId: number|null,
  type: string|null,
  index: number|null,
  msg: string|null,
}
export interface Alert {
  index: string|null,
  message: string|null,
  receiverId: string|null,
  receiverName: string|null,
  senderId: string|null,
  senderName: string|null,
  type: string|null,
}
interface AlertState {
  alert : AlertSend,
  realTimeAlert : Alert|null
  alertList : Alert[] | null,
}

const initialAlertState: AlertState = {
  alert :{
    senderId: null,
    receiverId: null,
    type: null,
    index: null,
    msg: null,
  },
  realTimeAlert : null,
  alertList : null,
};                                                                                             

// 해당 데이터에 접근할 때에는 , useSelector 를 이용하여 state를 조회
// useDispatch를 이용하면 action을 줄 수 있다.

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    setAlertList : (state,action) => {
      const loadedAlertList: Alert[] | null = [...action.payload]
      state.alertList = loadedAlertList
    }
  },
});

export const { setAlertList} = alertSlice.actions;

export default alertSlice.reducer;
