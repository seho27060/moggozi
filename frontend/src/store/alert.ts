import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
// import { RootState } from "./store";

export interface AlertSend {
  index : string | null;
  senderId: string | null;
  receiverId: string | null;
  type: string | null;
  msg: string | null;
}
export interface Alert {
  check: string | null;
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
  wsocket : WebSocket | null,
  alert: AlertSend;
  alertList: Alert[];
  realTimeAlert: boolean;
  isConnecting: boolean;
}

const initialAlertState: AlertState = {
  wsocket : null,
  alert: {
    senderId: null,
    receiverId: null,
    type: null,
    index: null,
    msg: null,
  },
  alertList: [],
  realTimeAlert: false,
  isConnecting: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    connectWsocket: (state, action) => {
      state.wsocket = new WebSocket("wss://i7c201.p.ssafy.io:443/api/ws/notification");
      const userId = action.payload.id
      console.log("login check", userId);
      let jsonSend: Alert = {
        check : "0",
        createdTime : "0",
        id : "0",
        index: "1",
        message: "message",
        receiverId: "0",
        receiverName: "start",
        senderId: "0",
        senderName: "anonymous",
        type: "register",
      };
      state.wsocket.onopen = function onOpen(evt: any) {
        if (userId && state.wsocket) {
          jsonSend.senderId = userId!.toString();
          jsonSend.senderName = action.payload.nickname!.toString();
          console.log("open user", jsonSend, "open", evt);
          state.wsocket!.send(JSON.stringify(jsonSend));
          state.isConnecting = true

          setInterval(() => {
            // const time = new Date()
            // console.log(`30 sec,now: ${time}`, isConnecting);
            const connetSend: AlertSend = {
              index: "1",
              receiverId: "1",
              senderId: userId!.toString(),
              type: "connection",
              msg: "1"
            };
            state.wsocket!.send(JSON.stringify(connetSend));
            // console.log("persisting connection", isConnecting, connetSend);
          }, 30000);
        }
      };
      state.wsocket.onclose = (evt: CloseEvent) => {
        if (action.payload.isLoggedIn) {
          console.log("Disconnected, 3초뒤 재연결", evt);
          state.wsocket = null;
          setTimeout(
            () =>
              (state.wsocket = new WebSocket(
                "wss://i7c201.p.ssafy.io:443/api/ws/notification"
              )),
            300
          );
        } else {
          console.log("Unconnected,", evt);
  
        }
        
      };
      state.wsocket.onmessage = (evt: any) => {
        const message = JSON.stringify(evt.data.toString())
        console.log(`${action.payload.userInfo}, you have message ${message}`);
        state.realTimeAlert = true
      };
      state.wsocket.onerror = (evt: any) => {
        alert(evt);
      };
    },
    setAlertList: (state, action) => {
      const loadedAlertList: Alert[] | null = [...action.payload];
      state.alertList = loadedAlertList;
    },
    setWsConnect: (state, action) => {
      console.log("set Connect", action.payload);
      state.alert = { ...action.payload };
    },
    setRealTimeAlert: (state, action) => {
      console.log("realtimealert set");
      state.realTimeAlert = action.payload
    },
  },
});

export const { connectWsocket,setAlertList, setWsConnect, setRealTimeAlert } =
  alertSlice.actions;

export default alertSlice.reducer;
