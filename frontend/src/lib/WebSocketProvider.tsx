import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Alert, setAlertList, setRealTimeAlert } from "../store/alert";
import { RootState } from "../store/store";
import { alertRecent } from "./withTokenApi";
// import SockJS from 'sockjs-client';
const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const realTimeAlert = useSelector(
    (state: RootState) => state.alert.realTimeAlert
  );
  const dispatch = useDispatch();

  const webSocketUrl = `wss://i7c201.p.ssafy.io:443/api/ws/notification`;
  let ws = useRef<WebSocket | null>(null);
  let jsonSend: Alert = {
    check: 0,
    createdTime: "0",
    id: "0",
    index: "1",
    message: "message",
    receiverId: "1",
    receiverName: "start",
    senderId: "36",
    senderName: "seh",
    type: "register",
  };
  // let sock = new SockJS(webSocketUrl)
  if (!ws.current && isLoggedIn && user.id) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = (evt: any) => {
      console.log("connected to " + webSocketUrl);
      jsonSend.senderId = user.id!.toString();
      jsonSend.senderName = user.nickname!.toString();
      console.log("open user", jsonSend, "open", evt);
      ws.current!.send(JSON.stringify(jsonSend));
      let checkList: Alert[] = [];
      alertRecent()
        .then((res) => {
          console.log("web connect alert list", res);
          dispatch(setAlertList(res));
          checkList = [...res];
          for (let index = 0; index < checkList.length; index++) {
            const element = checkList[index].check
            if (element === 0) {
              dispatch(setRealTimeAlert(true))
              break
            }
          }
        })
        .catch((err) => console.log("web connect alert list err", err));
      
      setInterval(() => {
        if (ws.current?.OPEN) {
          const time = new Date();
          console.log(`30 sec,now: ${time}`);
          ws.current!.send(JSON.stringify(jsonSend));
          // console.log("persisting connection", isConnecting, connetSend);
        } else {
          clearInterval();
        }
      }, 30000);
    };
    ws.current.onclose = (evt: any) => {
      console.log("disconnect from " + webSocketUrl);
      ws.current = new WebSocket(webSocketUrl);
      console.log(evt);
    };
    ws.current.onerror = (error) => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
    };
    ws.current.onmessage = (evt: MessageEvent) => {
      console.log(evt.data, `realtime${realTimeAlert}`);
      dispatch(setRealTimeAlert(true));
      // console.log(JSON.parse(ev))
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
